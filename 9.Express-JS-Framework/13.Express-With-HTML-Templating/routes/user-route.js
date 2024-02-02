/* eslint-disable arrow-body-style */
/* eslint-disable no-restricted-globals */
const express = require('express');
const { bodyParser } = require('body-parser');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const users = require('../data/users-data');

// setup bodyparser middle
// router.use(bodyParser.urlencoded({ extended: true }));

// get all users
router.get('/getuser', (request, response) => {
    return response.status(200).send(users);
});
// get specific users
router.get('/getuser/:userId', (request, response) => {
    const { params } = request;
    const parsedId = Number(params.userId);
    console.log(params);
    // console.log(parsedId);
    if (isNaN(parsedId)) {
        return response.status(400).send({ message: 'Bad Request' });
    }
    const findUser = users.usersInfo.find((user) => user.id === parsedId);
    console.log(findUser);
    if (!findUser) {
        return response.sendStatus(401);
    }
    return response.send(findUser);
});

// add users
router.get('/addusers/:id', (request, response) => {
    const requestBody = request.body;
    const requestParams = request.params;
    // console.log(request.body);
    if (!requestBody) {
        return response
            .status(400)
            .send({ success: true, data: [{ body: requestBody, params: requestParams }] });
    }
    return response
        .status(200)
        .send({ success: true, data: [{ body: requestBody, params: requestParams }] });
});
module.exports = router;
