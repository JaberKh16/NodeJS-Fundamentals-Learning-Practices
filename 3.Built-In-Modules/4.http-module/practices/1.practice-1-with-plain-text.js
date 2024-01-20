/*
    Example-1: Module 'http' With Plain Text
*/
const http = require('http');

const server = http.createServer((request, response) => {
    const statusCode = 200;
    response.writeHead(statusCode, { 'Content-Type': 'text/plain' });
    response.end('Welcome to the page');
});
server.listen(3000, '127.0.0.1', () => {
    console.log('Server is running on port:3000');
});
