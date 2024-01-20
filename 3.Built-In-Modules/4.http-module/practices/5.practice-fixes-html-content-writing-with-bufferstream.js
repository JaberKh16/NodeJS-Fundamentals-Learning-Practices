/*
  Example-5 Reading HTML Content From File

  Note: Writing html content directly to the client end resulted
  error saying- 'chunk' must be of type string or an instance
  of Buffer or Uint8Array

  Hint: Use readable/writable stream or pipes

*/

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
    fs.readFile(path.join(__dirname, '../html/index.html'), 'utf8', (error, htmlContent) => {
        if (error) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Internal Server Error');
            return;
        }

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write("<script>alert('Welcome user');</script>");
        response.write(htmlContent);
        response.end();
    });
});

server.listen(3000, () => {
    console.log('Server listening on port: 3000');
});
