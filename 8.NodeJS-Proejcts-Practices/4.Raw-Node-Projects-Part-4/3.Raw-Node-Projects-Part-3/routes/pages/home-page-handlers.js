const routeHandlers = {};

routeHandlers.homeRoutingRequest = (requestProperties, callback) => {
    console.log('Home Page');
    callback(200, {
        message: 'Home Page',
    });
};

module.exports = routeHandlers;
