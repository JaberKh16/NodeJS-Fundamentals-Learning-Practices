// eslint-disable-next-line import/no-unresolved
import bcrypt from 'bcrypt';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

import {
    createSession,
    destroySession,
    getUserBySession,
    loadUsers,
    parseRequestBody,
    saveUsers,
    serveFile,
} from './helpers/helpers';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

// create server
const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    if (req.method === 'GET') {
        if (req.url === '/' || req.url === '/index.html') {
            serveFile(res, path.join(__dirname, 'public', 'index.html'));
        } else if (req.url === '/register.html') {
            serveFile(res, path.join(__dirname, 'public', 'register.html'));
        } else if (req.url === '/login.html') {
            serveFile(res, path.join(__dirname, 'public', 'login.html'));
        } else if (req.url === '/dashboard.html') {
            const user = getUserBySession(req);
            if (!user) {
                res.writeHead(302, { Location: '/login.html' });
                res.end();
                return;
            }
            serveFile(res, path.join(__dirname, 'public', 'dashboard.html'));
        } else if (req.url === '/logout') {
            destroySession(req, res);
            res.writeHead(302, { Location: '/login.html' });
            res.end();
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    } else if (req.method === 'POST') {
        if (req.url === '/register') {
            parseRequestBody(req, async ({ username, password }) => {
                const users = loadUsers();
                if (users.find((u) => u.username === username)) {
                    res.end('User already exists');
                    return;
                }

                const hashed = await bcrypt.hash(password, 10);
                users.push({ username, password: hashed });
                saveUsers(users);

                res.writeHead(302, { Location: '/login.html' });
                res.end();
            });
        } else if (req.url === '/login') {
            parseRequestBody(req, async ({ username, password }) => {
                const users = loadUsers();
                const user = users.find((u) => u.username === username);
                if (!user) {
                    res.end('Invalid credentials');
                    return;
                }

                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    res.end('Invalid credentials');
                    return;
                }

                const sessionId = createSession(username);
                res.setHeader('Set-Cookie', `sessionId=${sessionId}; HttpOnly`);
                res.writeHead(302, { Location: '/dashboard.html' });
                res.end();
            });
        }
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
