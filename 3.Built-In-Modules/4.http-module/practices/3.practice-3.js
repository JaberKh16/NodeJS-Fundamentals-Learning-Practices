const http = require('http');
const fs = require('fs');
const port = 8080;
const host = '127.0.0.1';
const server = http.createServer((request, response) => {
  fs.readFile('./mods/index.html', (error, html) => {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    response.write(`<script>alert('hello');</script>`);
    response.write(html);
    response.end();
  })
})
server.listen(port, host, () => {
  console.log('ready');
})