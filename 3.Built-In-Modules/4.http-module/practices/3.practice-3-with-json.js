/*
    Example-3 Module 'http' With JSON Format
*/

const http = require('http');

const server1 = http.createServer((request, response) => {
    // response.writeHead(200);
    response.writeHead(200, {
        'Content-Type': 'application/json',
    });
    const content = {
        name: 'Brunce Wayne',
        character: 'Batman',
    };
    response.end(JSON.stringify(content));
});

server1.listen(3000, () => {
    console.log('Server running at https://localhost:3000');
});
