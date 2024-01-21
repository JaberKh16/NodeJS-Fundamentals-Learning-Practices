const routeHandlers = {};

routeHandlers.notFoundRoutingRequest = (requestProperties, callback) => {
    // console.log('404 Not Found Page');
    console.log(requestProperties);
    callback(404, {
        message: 'Page not found',
    });
};

module.exports = routeHandlers;
