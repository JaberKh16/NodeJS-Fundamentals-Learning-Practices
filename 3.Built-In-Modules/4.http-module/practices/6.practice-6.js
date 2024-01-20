const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 3000;
const host = '127.0.0.1';
const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url);
    const { pathname } = parsedUrl;

    const fileName = path.join(__dirname, `./html${pathname}/index.html`);

    fs.readFile(fileName, 'utf8', (error, htmlContent) => {
        if (error) {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end('<h1>Not Found</h1>');
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.pipe(htmlContent);
            response.end();
        }
    });
});

server.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
});
