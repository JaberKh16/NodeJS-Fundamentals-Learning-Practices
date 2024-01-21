// dependecies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const { type } = require('os');
const { routes } = require('../routes/routes');

// module scaffolding
const handlers = {};

// handle request response callback
handlers.handleRequestResponse = (request, response) => {
    // parse the url
    const parsedURL = url.parse(request.url, true);
    const parsedPath = parsedURL.pathname;
    const trimParsedPath = parsedPath.replace(/^\/+|\/+$/g, '');
    const method = request.method.toLowerCase();
    const queryString = parsedURL.query;
    const { headers } = request.headers;
    // setup all request properties to an object
    const reuqestObjProperties = {
        parsedURL,
        parsedPath,
        trimParsedPath,
        method,
        queryString,
        headers,
    };

    const decoder = new StringDecoder('utf8');
    let data = '';

    // setup a handler
    const chosenHandler = routes[trimParsedPath] ? routes.trimParsedPath : undefined;

    chosenHandler(reuqestObjProperties, (statusCodeValue, passedPayload) => {
        let statusCode = statusCodeValue;
        let payload = passedPayload;
        statusCode = typeof statusCode === 'number' ? statusCode : 500;
        payload = typeof payload === 'object' ? payload : {};
        const payloadString = JSON.stringify(payload);
        response.writeHead(statusCode, { 'Content-Type': 'application/json' });
        response.end(payloadString);
    });
    request.on('data', (bufferChunk) => {
        data += decoder.write(bufferChunk);
    });
    request.on('end', () => {
        data += decoder.end(); // to end the decoding
        console.log(data);
        response.end('Completed');
    });

    response.end('Hello');
};

module.exports = handlers.handleRequestResponse;
