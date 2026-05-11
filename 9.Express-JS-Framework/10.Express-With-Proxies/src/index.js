/*
    Express Validator Middleware Concepts In Express
    =================================================
    Express Validator is a third party middleware to work with
    the validation in server side.

    Some Functions To Work With Express Validator
    ---------------------------------------------
    a. query()              --> to work with the query params validation
    b. body()               --> to work with the body validation
    c. validationResult()   --> to work with the validation result error object

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
    query('filter')
        .toString()
        .withMessage('must be a string')
        .isLength({ min: 4, max: 10 })
        .withMessage('Length must 4-10 characters'),
    (req, res) => {
        const { filterCriteria, value } = req.query;

        // get the error info from express-validator middleware
        const validationErrors0 = validationResult(req);
        if (!validationErrors0.isEmpty()) {
            return res.status(400).json({ errors: validationErrors0.array() });
        }

        // filter users based on criteria
        if (filterCriteria && value) {
            const filteredUsers = users.usersInfo.filter((user) => {
                const userProperty = user[filterCriteria];
                if (typeof userProperty === 'string') {
                    return userProperty.includes(value);
                }
                if (Array.isArray(userProperty)) {
                    return userProperty.includes(value);
                }
                return false; // no matching property found
            });

            if (filteredUsers.length === 0) {
                return res.status(404).json({ error: 'No users found matching the criteria' });
            }

            return res.status(200).json(filteredUsers);
        }
        return res.status(400).json({ error: 'Filter criteria and value must be provided' });
    },
);

// listen request
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
