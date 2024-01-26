const express = require('express');

const routes = express.Router();
const { body } = require('express-validator');
const users = require('../data/users-data');

routes.get('/get-users', (request, response) => {
    const { cookies } = request.cookies;
    console.log(cookies); // resulted 'undefined'
    console.log(request.headers.cookie);
    // set coookie
    response.cookie('user-info', users, { maxAge: 30000 });
    // required cookie-parser to parse the cookie from the request
    const cookieInfo = request.cookies;
    console.log(cookieInfo);

    return response.status(200).send({ users });
});

module.exports = routes;
