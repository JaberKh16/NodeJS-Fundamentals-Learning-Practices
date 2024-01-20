const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const readHtmlContent = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
        const filePath = path.join(__dirname, '../html', 'form.html');
        const content = await fs.readFile(filePath, 'utf8');
        return content;
    } catch (err) {
        throw err;
    }
};

const writeToFile = async (filePath, message) => {
    try {
        await fs.writeFile(filePath, message, 'utf8');
    } catch (err) {
        console.error(err);
    }
};

const server = http.createServer(async (req, res) => {
    const requestUrl = req.url;
    const requestMethod = req.method;

    if (requestUrl === '/') {
        try {
            const content = await readHtmlContent();
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            res.write(content);
            return res.end();
        } catch (err) {
            console.error(err);
            res.writeHead(500, {
                'Content-Type': 'text/plain',
            });
            res.end('Internal Server Error');
        }
    }

    if (requestUrl === '/submitted' && requestMethod === 'POST') {
        const data = [];
        req.on('data', (chunk) => {
            data.push(chunk);
        });

        req.on('end', async () => {
            const parsedBodyData = Buffer.concat(data).toString();
            const message = parsedBodyData.split('=')[1];
            const filePath = path.join(__dirname, '../html', 'text.txt');
            await writeToFile(filePath, message);
        });

        res.writeHead(200, {
            'Content-Type': 'text/html',
        });
        return res.end();
    }
});

server.listen(3000, () => {
    console.log('Server listening on port: 3000');
});
