/* eslint-disable consistent-return */
/* eslint-disable quotes */
/* eslint-disable radix */
/* eslint-disable no-restricted-globals */
const express = require('express');
const users = require('../data/users-data');

// creating instance of express
const app = express();

// middleware
app.use(express.json()); // getting json setup

// setup port number
const PORT = process.env.PORT || 3000;
// setup routes
app.get('/', (req, res) => {
    res.send('Welcome to the page');
});

app.get('/api/users', (req, res) => {
    res.send({ users });
});

// route params
app.get('/api/users/:id', (req, res) => {
    const { params } = req;
    console.log(params);
    const parsedId = parseInt(params.id);
    if (isNaN(parsedId)) {
        return res.status(400).send({ message: 'Bad Request' });
    }
    const findUser = users.usersInfo.find((user) => user.id === parsedId);
    if (!findUser) {
        return res.sendStatus(404);
    }
    return res.send(findUser);
});
// setup query string
app.get('/api/users/:id', (req, res) => {
    const {
        queryParams: { filter, value },
    } = req;
    console.log(req.query);
    // when query parameter is undefined
    if (!filter && !value) {
        return res.send(users);
    }
    if (filter && value) {
        return res.send(users.userInfo.filter((user) => user[filter].includes(value)));
    }
});

// post request
app.post('/api/users', (req, res) => {
    console.log(req.body);
    const { body } = req.body;
    const newUsers = {
        id: users[users.length - 1].id + 1,
        ...body,
    };
    users.push(newUsers);
    return res.status(201).send(newUsers);
});

// post request - full update
app.post('/api/users/:id', (req, res) => {
    const {
        body,
        params: { id },
    } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return res.sendStatus(400);
    }
    const findUserIndex = users.userInfo.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) {
        return res.sendStatus(404);
    }
    users[findUserIndex] = {
        id: parsedId,
        ...body,
    };
    return res.sendStatus(200);
});

// patch request - partial update
app.patch('/api/users/:id', (req, res) => {
    const {
        body,
        params: { id },
    } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return res.sendStatus(400);
    }
    const findUserIndex = users.usersInfo.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) {
        return res.sendStatus(404);
    }
    users[findUserIndex] = {
        ...users[findUserIndex],
        ...body,
    };
    return res.status(200).send(users);
});

// delete request
app.delete('/api/users/:id', (req, res) => {
    const {
        params: { id },
    } = req.params;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return res.sendStatus(400);
    }
    const findUserIndex = users.userInfo.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) {
        return res.sendStatus(404);
    }
    users.splice(findUserIndex, 1);
    return res.sendStatus(200);
});

// listen request
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
