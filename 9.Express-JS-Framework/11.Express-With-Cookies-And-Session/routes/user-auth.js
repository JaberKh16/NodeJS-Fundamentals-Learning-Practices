/* eslint-disable consistent-return */
const express = require('express');

const { body, validationResult } = require('express-validator');
const { userValidationSchema } = require('../validation-schema/user-auth-schema');
const users = require('../data/users-data');

const routes = express.Route();

routes.post('/auth/users', userValidationSchema, (request, response) => {
    const errors = validationResult(request);
    if (!errors.notEmpty()) {
        return response.status(400).send({ msg: errors.array() });
    }
    // continue after validation passes
    const {
        body: { userName, password },
    } = request;
    const findUser = users.userInfo.find((user) => user.userName === userName);
    if (!findUser || findUser.password !== password) {
        return response.status(401).send({ msg: 'Bad Credentials' });
    }
    // set dynamicly session with user
    request.session.user = findUser;
    return response.status(200).send(findUser);
});
routes.get('/auth/status', (request, response) => {
    // getting session history
    request.sessionStore.get(request.sessionID, (error, data) => {
        if (error) {
            return response.status(401).send({ msg: 'Session Expires' });
        }
        console.log(data);
    });
    return request.session.user
        ? response.status(200).send(request.session.user)
        : response.status(400).send({ msg: 'Unauthorized user' });
});

module.exports = routes;
