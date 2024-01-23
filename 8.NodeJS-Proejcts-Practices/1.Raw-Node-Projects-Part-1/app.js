// dependencies
const http = require('http');
const { handleRequestResponse } = require('./helpers/handlereqreshanlders');

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
        console.log(`Listening on port: ${app.config.port}`);
    });
};

// callback handlers
app.handleRequestResponse = handleRequestResponse;

// invokation
app.createServer();
