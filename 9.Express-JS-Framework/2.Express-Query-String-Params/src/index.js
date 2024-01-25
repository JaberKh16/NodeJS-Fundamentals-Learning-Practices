/* eslint-disable consistent-return */
/* eslint-disable quotes */
/* eslint-disable radix */
/* eslint-disable no-restricted-globals */
// dependencies
const express = require('express');
const users = require('../data/users-data');

// creating instance of express
const app = express();

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
    console.log(req);
    console.log(req.query);
    // when query parameter is undefined
    if (!filter && !value) {
        return res.send(users);
    }
    if (filter && value) {
        return res.send(users.userInfo.filter((user) => user[filter].includes(value)));
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
