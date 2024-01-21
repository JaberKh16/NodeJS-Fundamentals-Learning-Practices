// dependencies
const http = require('http');

// module scaffolding
const app = {};

// configuration
app.config = {
    port: 3000,
    host: '127.0.0.1',
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleServerReqResCallback);
    server.listen(app.config.port, app.config.host, () => {
        console.log('Listening on port:3000');
    });
};

// handle request response callback
app.handleServerReqResCallback = (request, response) => {
    response.end('Hello');
};
