/* eslint-disable consistent-return */
const express = require('express');

const { validationResult } = require('express-validator');
const { checkSchema } = require('express-validator');
const userValidationSchema = require('../validation-schema/user.auth.schema');
const users = require('../data/users-data');

const routes = express.Router(); // Change this line to use Router() instead of Route()

routes.post('/auth/users', checkSchema(userValidationSchema), (request, response) => {
    const errors = validationResult(request);
    console.log(errors);
    // check if the errors object is empty
    if (errors.isEmpty()) {
        return response.status(400).send({ msg: errors.array() });
    }
    // continue after validation passes
    const {
        body: { userName, password },
    } = request;
    console.log(`Username: ${userName}, Password: ${password}`);
    const findUser = users.usersInfo.find((user) => user.userName === userName);
    if (!findUser || findUser.password !== password) {
        return response.status(401).send({ msg: 'Bad Credentials' });
    }
    // set dynamically session with user
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
