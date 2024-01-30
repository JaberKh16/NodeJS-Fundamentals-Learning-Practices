/* eslint-disable no-restricted-globals */
const express = require('express');
const { boyd, validationResult } = require('express-validator');

const router = express.Router();
const users = require('../data/users-data');

router.get('/alluser', (request, response) => response.status(200).send(users));
router.post('/getuser/:id', (request, response) => {
    const { params } = request;
    const parsedId = params.id;
    console.log(params);
    // console.log(parsedId);
    if (isNaN(parsedId)) {
        return response.status(400).send({ message: 'Bad Request' });
    }
    const findUser = users.usersInfo.find((user) => user.id === parsedId);
    if (!findUser) {
        return response.sendStatus(401);
    }
    return response.send(findUser);
});
module.exports = router;
