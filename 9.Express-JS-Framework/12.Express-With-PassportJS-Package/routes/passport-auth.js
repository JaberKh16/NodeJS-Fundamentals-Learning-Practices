const express = require('express');
const passport = require('passport');
// getting the passport local strategy
const passportLocalStrategy = require('../strategies/local-strategy');

const passportRoutes = express.Router();

/* eslint-disable prettier/prettier */
// passport.authenticate() is basically used to call the local strategy function
passportRoutes.post(
    '/api/authpass',
    passport.authenticate('local'), // though strategy is local
    (request, response) => {
        response.status(200);
    },
);

// passport.authenticate() is basically used to call the local strategy function
passportRoutes.get(
    '/api/authpass/status',
    (request, response) => {
        console.log('Inside /authpass/status endpoint');
        if (request.user) {
            response.status(200).send(request.user);
        }
        return request.user ? response.send(request.user) : response.sendStatus(401);
    },
);

// setup logout
passportRoutes.post(
    '/api/authpass/logout',
    (request, response) => {
        console.log('Inside /authpass/status endpoint');
        if (!request.user) {
            response.sendStatus(401).send({ msg: 'Not logged in' });
        }
        request.logout((error) => {
            if (error) {
                return response.sendStatus(400);
            }
            return response.sendStatus(200);
        });
    },
);

module.exports = passportRoutes;
