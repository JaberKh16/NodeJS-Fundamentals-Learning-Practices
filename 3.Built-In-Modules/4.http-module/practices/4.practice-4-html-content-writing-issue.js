/*
  Example-5 Reading HTML Content From File

  Note: Writing html content directly to the client end resulted
  error saying- 'chunk' must be of type string or an instance
  of Buffer or Uint8Array

  Hint: Use readable/writable stream or pipes

*/

const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    fs.readFile('../html/index.html', (error, htmlContent) => {
        if (error) {
            return response.write(JSON.stringify({ msg: error, success: false }));
        }
        response.writeHead(200, {
            'Content-Type': 'text/html',
        });
        response.write("<script>alert('hello');</script>");
        response.write(htmlContent); // resulted error
        response.end();
    });
});
server.listen(3000, () => {
    console.log('Server listening on port: 8080');
});
