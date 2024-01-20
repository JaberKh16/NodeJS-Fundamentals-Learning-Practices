/*
    NodeJS Module Concept - 'http' Module
    ======================================
    NodeJS provides 'http' module to work with the server
    which is used working with http server.

    Syntax:
        const http = require('http');
        http.createServer(function(request, response){

        });
        http.listem(port, ()=>{
            console.log('listening on port: '+port);
        })

    Methods Of 'http' Module
    -------------------------
    With http module there are two types of stream which being passed
    as callback to the createServer() method where both has their
    different methods to work with.
        a. request.someMethod()
        b. response.someMethod()

    request Property and Methods
    ----------------------------
    a. request.url     --> returns the url of the server
    b. request.method  --> returns the http method type
    c. request.headers --> returns the headers of the server

    response Property and Methods
    -----------------------------
    Properties:
        a. response.statusCode --> to set the http status code

    Methods:
        a.response.end()        --> returns the ending of server response, can be used to
                                    write data(response) also. This method writing is
                                    syhnchronous block writing.
        b.response.write()      --> to write response in chunk order.
        c.response.setHeader()  --> to set headers for the response
        d.response.writeHead()  --> to write headers for the response
*/
const http = require('http');

const server1 = http.createServer((request, response) => {
    // response.writeHead(200);
    response.writeHead(200, {
        'Content-Type': 'text/html ',
    });
    // response.write('<h2>Welcom to page</h1>');
    response.end('<h2>Welcom to page</h1>');
    console.log(request.url, request.method, request.headers);
});

// Port to listen on
server1.listen(3000, '127.0.0.1', () => {
    console.log('Server is running on http://localhost:3000/');
});
