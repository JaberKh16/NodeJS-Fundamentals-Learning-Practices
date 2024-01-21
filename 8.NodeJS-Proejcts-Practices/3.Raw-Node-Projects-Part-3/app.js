// dependencies
const http = require('http');
const { handleRequestResponse } = require('./helpers/handlereqreshanlders');
const { environment } = require('./helpers/environments');

// module scaffolding
const app = {};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleServerReqResCallback);
    server.listen(environment.port, environment.config.host, () => {
        console.log(`Listening on port: ${app.config.port}`);
    });
};

// callback handlers
app.handleRequestResponse = handleRequestResponse;

// invokation
app.createServer();
