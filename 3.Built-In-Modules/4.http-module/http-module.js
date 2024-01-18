const http = require('http');

const server = http.createServer((request, response) => {
    console.log(request.url);

    if (request.url === '/') {
        response.write('Welcome to the server');
        // response.end();
    }

    if (request.url === '/aboutus') {
        response.write('Welcome to the about us page');
        // response.end();
    }

    if (!response.finished) {
        response.write(
            `<h2>Page not existed</h2>` +
            `<a href='/'>Back Home</a>`
        );
        // response.end();
    }
});

// Port to listen on
server.listen(5000, () => {
    console.log('Server is running on http://localhost:5000/');
});
