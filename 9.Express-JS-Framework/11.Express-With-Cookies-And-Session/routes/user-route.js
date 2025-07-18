const express = require('express');

const routes = express.Router();
const users = require('../data/users-data');

routes.get('/get-users', (request, response) => {
    const { cookies } = request.cookies;
    console.log(cookies); // resulted 'undefined'
    console.log(request.headers.cookie);
    // set coookie
    response.cookie('userInfo', users, { maxAge: 30000 });
    // required cookie-parser to parse the cookie from the request
    const cookieInfo = request.cookies;
    console.log(cookieInfo);

    return response.status(200).send({ users });
});

module.exports = routes;
