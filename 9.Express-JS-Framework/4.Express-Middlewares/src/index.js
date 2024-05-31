/*
    Middleware Concepts In Express
    ==============================
    Middleware is nothing but the routing way to define
    whats to do while routing. It is a function that
    have access to the 'request' and 'response' object
    and the next() function which, when invoked executes
    the middleware succeeding the current middleware.

    If the current middlware function does not end the
    request-response cycle, it must call next() to pass
    control to the next middlware function, otherwise the
    request will be left hanging.

    Syntax:
        a. const middleware = (req, res, next) =>{ next(); }
        b. app.get('url', (req, res, next)=>{}, (req, res)=>{next();});
        c. app.get('url', (req, res, next)=>{}, (req, res, next)=>{next();}, (req, res)=>{});

    In the Middleware, next() is important which needs to be passed so that
    routing can go further.

    Also, chaining of middleware is possible like see in the 'c' on the
    syntax section.

    Note: Middleware function order is matter because the order is called
    that order it will be executed.

    Use Case Of Middlware In Express
    --------------------------------
    a. Application-Level Middleware
    b. Router-Level Middleware
    c. Error-Handling Middleware
    d. Built-In Middleware
    e. Third-Party Middleware
*/
/* eslint-disable quotes */
/* eslint-disable radix */
/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
const express = require('express');
// third party middleware
const morganLogger = require('morgan');
const multer = require('multer');
const users = require('../data/users-data');

// creating instance of express
const app = express();

// built-in middleware
app.use(express.json()); // getting json setup to parse the parse request body
app.use(morganLogger('combined'));

// application level middleware
const loggingMiddleware = (reqeust, response, next) => {
    console.log(reqeust.method, reqeust.url);
    next();
};

// include loggingMiddleware as globally
app.use(loggingMiddleware);

// creating another middlware
const resolvedUserIdMiddleware = (request, response, next) => {
    const {
        id,
    } = request.params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
        return response.sendStatus(400);
    }
    const findUserIndex = users.usersInfo.findIndex((user) => user.id === parsedId);
    if (findUserIndex !== -1) {
        request.findUserIndex = findUserIndex; // passing via included in the request object
        request.parsedId = parsedId;
    }
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
    const { id } = req.params;

    const parsedId = parseInt(id);
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
app.get('/api/filter/users', (req, res) => {
    const {
        query: { filter, value },
    } = req;
    console.log(req.query);
    // when query parameter is undefined
    if (!filter && !value) {
        return res.send(users);
    }
    if (filter && value) {
        const filteredUser = users.usersInfo.filter((user) => {
            const userProperty = user[filter];
            if (typeof userProperty === 'string') {
                return userProperty.includes(value);
            }
            if (Array.isArray(userProperty)) {
                return userProperty.includes(value);
            }
            return false;
        });
        return res.send(filteredUser);
    }
});

// post request
app.post('/api/users', (req, res) => {
    console.log(req.body);
    if (req.body.id) {
        const parsedId = parseInt(req.body.id);
        if (parsedId) {
            const existedUser = users.usersInfo.find((user) => user.id === parsedId);
            if (!existedUser) {
                const newUsers = {
                    // eslint-disable-next-line max-len
                    id: users.usersInfo[users.usersInfo.length - 1].id + 1, // set the id of the user
                    ...req.body, // body has the request body response
                };
                console.log(users.usersInfo.length);
                users.usersInfo.push(newUsers);
                // send the updated users array in the response
                return res.status(201).send(newUsers);
            }
            return res.status(200).send({ message: 'User id already existed.' });
        }
    }
});

// put request - full update
app.put('/api/users/:id', resolvedUserIdMiddleware, (request, response) => {
    const { body, findUserIndex, params: { id } } = request;

    users.usersInfo[findUserIndex] = {
        id: parseInt(id),
        ...body,
    };
    return response.status(200).send({ message: 'success' });
});

// patch request - partial update
app.patch('/api/users/:id', resolvedUserIdMiddleware, (request, response) => {
    const { body, findUserIndex, params: { id } } = request;
    users.usersInfo[findUserIndex] = {
        ...users.usersInfo[findUserIndex],
        ...body,
    };
    return response.status(200).send(users);
});

// delete request
app.delete('/api/users/:id', resolvedUserIdMiddleware, (request, response) => {
    const { findUserIndex } = request;
    users.usersInfo.splice(findUserIndex, 1);
    return response.sendStatus(200);
});

// listen request
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
