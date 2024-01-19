const http = require('http');
const server = http.createServer((request, response) =>{
    const statusCode = response.statusCode;
    const headers = response.headers('Content-Type', 'text/plain');
    response.end('<h1>Welcome to the page</h1>')
});


server.listen(3000, '127.0.0.1', ()=>{
    console.log('Server is running on port:3000');
})