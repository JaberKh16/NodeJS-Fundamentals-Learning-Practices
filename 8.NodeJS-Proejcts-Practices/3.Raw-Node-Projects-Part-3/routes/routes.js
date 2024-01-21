// dependencies
const { homeRoutingRequest } = require('./pages/home-page-handlers');
const { notFoundRoutingRequest } = require('./pages/not-found-handlers');

const routes = {
    home: homeRoutingRequest,
    unavailable: notFoundRoutingRequest,
};

module.exports = routes;
