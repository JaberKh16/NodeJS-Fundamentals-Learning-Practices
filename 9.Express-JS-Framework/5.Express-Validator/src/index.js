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

    Express validators can be defined using in the following way:
        1. query('field').isString().isLength({ min: 3, max:10 }) // without [] when single validation
        2. [ query('field').isString().isLength({ min: 3, max:10 })] // with [] when single or multiple validation
    
    Note: Express Validator validates the field but dont through any error unless its defined to through error.
*/

/* eslint-disable quotes */
/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */


// import express from 'express';
// import { query, validationResult } from 'express-validator';
// import users from '../data/users-data.js';

const express = require('express');
const { query, validationResult } = require('express-validator');
const {users} = require('../data/users-data');

// creating instance of express
const app = express();

// setup port number
const PORT = process.env.PORT || 3000;

app.get('/api/users', (req, res) => {
    res.send({ users });
});

// route params
// setup query string
// request demo: localhost:3000/api/users-1?filterCriteria=userName&value=a
app.get(
    '/api/users/filter',
    query('value').isString().toLowerCase(),
    (req, res) => {
        const { filterCriteria, value } = req.query;
        console.log(req.query);
        if (filterCriteria && value) {
            const filteredUsers = users.usersInfo.filter((user) => {
                const userProperty = user[filterCriteria];
                if(typeof userProperty === 'string'){
                    return userProperty.includes(value);
                }
                if(Array.isArray(userProperty)){
                    return userProperty.includes(value);
                }
                return false;
            });
            console.log(filteredUsers);
            return res.send(filteredUsers);
        } else {
            return res.status(400).json({ error: 'Filter and value query parameters are required.' });
        }
    },
);

// with single message setup
app.get(
    '/api/users-1/',
    [ query('value').isString().isLength({ min: 1, max: 10 }).withMessage('must be a string')],
    (req, res) => {
        
        // get the error info from express-validator middleware
        const validationErr = validationResult(req);
        console.log(validationErr);
        if (!validationErr.isEmpty()) {
            return res.status(400).json({ errors: validationErr.array() });
        }

        const {
            filterCriteria, value
        } = req.query;
        // console.log(req['express-validator#contexts']); // can see express-validator info
        if (filterCriteria && value) {
            const filteredUsers = users.usersInfo.filter((user) => {
                const userProperty = user[filterCriteria];
                if(typeof userProperty === 'string'){
                    return userProperty.includes(value);
                }
                if(Array.isArray(userProperty)){
                    return userProperty.includes(value);
                }
                return false;
            });
            console.log(filteredUsers);
            return res.send(filteredUsers);
        }else{
            return res.status(400).json({ error: 'Filter and value query parameters are required.' });
        }
    },
);

// with multiple message setup
app.get(
    '/api/users-2/',
    [ query('value')
        .notEmpty() // setup required field
        .withMessage('must required field')
        .isString()
        .withMessage('must be a string')
        .isLength({ min: 2, max: 10 })
        .withMessage('Length must 2-10 characters')
    ],
    (req, res) => {
        const {
            query: { filterCriteria, value },
        } = req;
        // get the error info from express-validator middleware
        const validationErr = validationResult(req);
        if (!validationErr.isEmpty()) {
            return res.status(400).json({ errors: validationErr.array() });
        }
        if (filterCriteria && value) {
            const filteredUsers = users.usersInfo.filter((user) => {
                const userProperty = user[filterCriteria];
                if(typeof userProperty === 'string'){
                    return userProperty.includes(value);
                }
                if(Array.isArray(userProperty)){
                    return userProperty.includes(value);
                }
                return false;
            });
            console.log(filteredUsers);
            return res.send(filteredUsers);
        }else{
            return res.status(400).json({ error: 'Filter and value query parameters are required.' });
        }
    },
);

// listen request
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
