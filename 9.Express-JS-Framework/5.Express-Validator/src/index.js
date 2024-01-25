/*
    Middleware Concepts In Express
    ==============================
    Middleware is nothing but the routing way to define
    whats to do while routing.

    Syntax:
        a. const middleware = (req, res, next) =>{}
        b. app.get('url', (req, res, next)=>{}, (req, res)=>{});
        c. app.get('url', (req, res, next)=>{}, (req, res, next)=>{}, (req, res)=>{});

    In the Middleware, next() is important which needs to be passed so that
    routing can go further.

    Also, chaining of middleware is possible like see in the 'c' on the
    syntax section.

*/
/* eslint-disable quotes */
/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-globals */
const express = require('express');
const users = require('../data/users-data');

// creating instance of express
const app = express();

// middleware
app.use(express.json()); // getting json setup
const loggingMiddleware = (reqeust, response, next) => {
    console.log(reqeust.method, reqeust.url);
    next();
};
app.use(loggingMiddleware);
const resolvedUserIdMiddleware = (request, response, next) => {
    const {
        params: { id },
    } = request;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return response.sendStatus(400);
    }
    const findUserIndex = users.usersInfo.findIndex((user) => user.id === parsedId);
    request.findUserIndex = findUserIndex;
    return next();
};

// setup port number
const PORT = process.env.PORT || 3000;
// setup routes
app.get(
    '/',
    (req, res, next) => {
        console.log('Base URL');
        next();
    },
    (req, res) => {
        res.send('Welcome to the page');
    },
);

app.get('/api/users', (req, res) => {
    res.send({ users });
});

// route params
app.get('/api/users/:id', (req, res) => {
    const { params } = req.params;
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
        return res.send(users.usersInfo.filter((user) => user[filter].includes(value)));
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
    users.usersInfo.push(newUsers);
    return res.status(201).send(newUsers);
});

// post request - full update
app.post('/api/users/:id', resolvedUserIdMiddleware, (req, res) => {
    const { body, findUserIndex } = req;

    users.usersInfo[findUserIndex] = {
        id: findUserIndex,
        ...body,
    };
    return res.sendStatus(200);
});

// patch request - partial update
app.patch('/api/users/:id', resolvedUserIdMiddleware, (req, res) => {
    const { body, findUserIndex } = req;

    users.usersInfo[findUserIndex] = {
        ...users[findUserIndex],
        ...body,
    };
    return res.status(200).send(users);
});

// delete request
app.delete('/api/users/:id', resolvedUserIdMiddleware, (req, res) => {
    const { findUserIndex } = req;
    users.userInfo.splice(findUserIndex, 1);
    return res.sendStatus(200);
});

// listen request
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
