/*
    Express API Concept
    ===================
    Express API consists of various methods and properties on the
    request and response objects. These are inherited by prototype.
    There are two extension points for the Express API:

    1. The global prototypes-
        a. express.request
        b. express.response
    2. App-specific prototypes-
        a. app.request
        b. app.response

    Altering the global prototypes will affect all loaded Express
    apps in the same process. If desired, alterations can be
    made app-specific by only altering the app-specific prototypes
    after creating a new app.

    Method Of Express API
    ---------------------
    Express API helps to customize the exisiting express function
    to a custom setup function.
    Example-
        app.response.sendStatus = function(statusCode, type, msg){
            return this.contentType(type)
            .status(statusCode)
            .send(msg)
        }
        res.sendStatus(404, 'application/json',
            '{"error":"resource not found"}'
        );

    The above implementation completely changes the original signature
    of res.sendStatus. It now accepts a status code, encoding type,
    and the message to be sent to the client.

    Properties Of Express API
    -------------------------
    Properties in the Express API are either:

        1. Assigned properties (ex: req.baseUrl, req.originalUrl)
        2. Defined as getters (ex: req.secure, req.ip)

    Since properties under category 1 are dynamically assigned on the
    request and response objects in the context of the current
    request-response cycle, their behavior cannot be overridden.

    Properties under category 2 can be overwritten using the Express
    API extensions API.
    Example-
        Object.defineProperty(app.request, 'ip', {
            configurable: true,
            enumerable: true,
            get () { return this.get('Client-IP') }
        })

    Prototype Of Express API
    ------------------------
    In order to provide the Express.js API, the request/response obects
    passed to Express.js (via app(req, res), for example) need to inherit
    from the same prototype chain.

    By default this is http.IncomingRequest.prototype for the request and
    http.ServerResponse.prototype for the response.

    Unless necessary, it is recommended that this be done only at the application
    level, rather than globally. Also, take care that the prototype that is being
    used matches the functionality as closely as possible to the default prototypes.

    Example-
        // Use FakeRequest and FakeResponse in place of http.IncomingRequest and http.ServerResponse
        // for the given app reference
        Object.setPrototypeOf(
            Object.getPrototypeOf(app.request),
            FakeRequest.prototype
        )
        Object.setPrototypeOf(
            Object.getPrototypeOf(app.response),
            FakeResponse.prototype
        )

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
            query: { filter, value },
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
            query: { filter, value },
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
            query: { filter, value },
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
