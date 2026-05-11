import fs from 'fs';

// Helper function to serve static files
function serveFile(res, filePath, contentType = 'text/htnl') {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

// Helper function to read data from body request
function parseRequestBody(req, callback) {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const params = new URLSearchParams(body);
        const data = Object.fromEntries(params.entries());
        callback(data);
    });
}

//  Helper: load and save users
function loadUsers() {
    if (!fs.existsSync('users.json')) return [];
    return JSON.parse(fs.readFileSync('users.json', 'utf8'));
}

function saveUsers(users) {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

//  Simple session management (in memory)
const sessions = new Map();

function createSession(username) {
    const sessionId = Math.random().toString(36).substring(2);
    sessions.set(sessionId, username);
    return sessionId;
}

function getUserBySession(req) {
    const { cookie } = req.headers;
    if (!cookie) return null;
    const match = cookie.match(/sessionId=([a-z0-9]+)/);
    if (!match) return null;
    return sessions.get(match[1]);
}

function destroySession(req, res) {
    const { cookie } = req.headers;
    if (!cookie) return;
    const match = cookie.match(/sessionId=([a-z0-9]+)/);
    if (match) sessions.delete(match[1]);
    res.setHeader('Set-Cookie', 'sessionId=; Max-Age=0');
}

export {
    createSession,
    destroySession,
    getUserBySession,
    loadUsers,
    parseRequestBody,
    saveUsers,
    serveFile
};

