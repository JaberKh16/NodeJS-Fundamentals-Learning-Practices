/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */
/* eslint-disable no-restricted-globals */
const express = require('express');
const { bodyParser } = require('body-parser');
const { validationResult } = require('express-validator');

const router = express.Router();
const users = require('../data/users-data');
const validationSchema = require('../validation-schema/user-data-validation');

// setup bodyparser middle
router.use(express.urlencoded({ extended: false }));

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
router.post('/addusers', validationSchema.createUserValiationSchema, (request, response) => {
    const { userName, displayName, password } = request.body;
    console.log(request.body);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    if (!userName || !displayName || !password) {
        return response.status(400).send({ success: false, error: 'fields are required' });
    }

    const newUsers = {
        id: users.usersInfo[users.usersInfo.length - 1].id + 1,
        userName,
        displayName,
        password,
    };

    users.usersInfo.push(newUsers);

    return response
        .status(200)
        .send({ success: true, data: { body: request.body, users: users.usersInfo } });
});

router.patch('/updateuser/:id', validationSchema.createUserValiationSchema, (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const {
        body,
        params: { id },
    } = request;
    console.log(request.body);
    const parsedId = Number(id);
    console.log(id);
    if (isNaN(parsedId)) {
        return response.status(400).send({ success: false, message: 'Bad Request' });
    }
    const findUserIndex = users.usersInfo.findIndex((user) => user.id === parsedId);
    console.log(findUserIndex);
    if (findUserIndex === -1) {
        return response.status(200).send({ success: true, message: 'User not found' });
    }
    users.usersInfo[findUserIndex] = {
        ...users.usersInfo[findUserIndex],
        ...body,
    };
    return response
        .status(200)
        .send({ success: true, message: 'User record udapted', data: users.usersInfo });
});

router.delete('/deleteuser/:id', (request, response) => {
    const { params } = request;
    const { id } = params;
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
        return response.status(400).send({ success: false, message: 'Bad Request' });
    }
    const findUserIndex = users.usersInfo.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) {
        return response.status(200).send({ success: true, message: 'User not found' });
    }
    users.usersInfo.splice(findUserIndex, 1);
    if (users.usersInfo.length < 0) {
        return response
            .status(201)
            .send({ success: true, message: 'No more record to delete', data: users.usersInfo });
    }
    return response
        .status(200)
        .send({ success: true, message: 'User record deleted', data: users.usersInfo });
});
module.exports = router;
