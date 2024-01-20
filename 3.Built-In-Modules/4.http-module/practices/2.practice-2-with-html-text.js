/*
  Example-2 Module 'http' With HTML Type
*/

const http = require('http');

const port = 3000;
const host = '127.0.0.1';

const server = http.createServer((request, response) => {
    console.log(request.url);
    response.writeHead(200, { 'Content-Type': 'text/html' });
    // write() converts the response
    // response.end('<h1>Welcome to the page</h1>');
    // response.write('<h1>Welcome to the page</h1>');
    response.write(`Request URL : ${request.url}`);
});

server.listen(port, host, () => {
    console.log('Server listening on port: 3000');
});
