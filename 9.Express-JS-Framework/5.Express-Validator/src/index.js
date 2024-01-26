/*
    Express Validator Middleware Concepts In Express
    =================================================
    Express Validator is a third party middleware to work with
    the validation in server side.

    Some Functions To Work With Express Validator
    ---------------------------------------------
    a. query()              --> to work with the query params validation
    b. body()               --> to work with the body validation with req.body
    c. validationResult()   --> to work with the validation result error object
    d. matchData()          --> to work with response data
    e. check()              --> used for validating and sanitizing http request
    f. cookies()            --> to work with req.cookies
    g. header()             --> to work with req.headers
    h. param()              --> to work with req.params
    i. query()              --> to work with req.query

    Follow the link -
    [https://express-validator.github.io/docs/guides/getting-started]

*/
/* eslint-disable quotes */
/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const { query, validationResult } = require('express-validator');
const users = require('../data/users-data');

// creating instance of express
const app = express();

// setup port number
const PORT = process.env.PORT || 3000;

app.get('/api/users', (req, res) => {
    res.send({ users });
});

// route params
// setup query string
app.get(
    '/api/users/',
    query('filter').toString().toLowerCase(),
    (req, res) => {
        const {
            queryParams: { filter, value },
        } = req;
        console.log(req.query);
        console.log(req); // can see express-validator info
        if (filter && value) {
            return res.send(
                users.usersInfo.filter((user) => {
                    user[filter].includes(value);
                }),
            );
        }
    },
);

app.get(
    '/api/users-1/',
    query('filter').toString().isLength({ min: 4, max: 10 }),
    (req, res) => {
        const {
            queryParams: { filter, value },
        } = req;
        // get the error info from express-validator middleware
        const resultErr = validationResult(req);
        console.log(resultErr);
        console.log(req.query);
        console.log(req); // can see express-validator info
        if (filter && value) {
            return res.send(
                users.usersInfo.filter((user) => {
                    user[filter].includes(value);
                }),
            );
        }
    },
);

app.get(
    '/api/users-2/',
    query('filter')
        .toString()
        .withMessage('must be a string')
        .isLength({ min: 4, max: 10 })
        .withMessage('Length must 4-10 characters'),
    (req, res) => {
        const {
            queryParams: { filter, value },
        } = req;
        // get the error info from express-validator middleware
        const resultErr = validationResult(req);
        console.log(resultErr);
        console.log(req.query);
        console.log(req); // can see express-validator info
        if (filter && value) {
            return res.send(
                users.usersInfo.filter((user) => {
                    user[filter].includes(value);
                }),
            );
        }
    },
);

// listen request
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
