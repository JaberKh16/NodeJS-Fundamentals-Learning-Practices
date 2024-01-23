// dependencies
const { homeRoutingRequest } = require('./pages/home-page-handlers');
const { notFoundRoutingRequest } = require('./pages/not-found-handlers');
const { userHandler } = require('./users/user-handler');

const routes = {
    home: homeRoutingRequest,
    user: userHandler,
};

module.exports = routes;
