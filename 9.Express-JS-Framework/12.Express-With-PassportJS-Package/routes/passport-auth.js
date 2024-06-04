import express from 'express';
import passport from 'passport';
// getting the passport local strategy
// eslint-disable-next-line import/extensions, import/no-import-module-exports
import '../strategies/local-strategy.js';

const passportRoutes = express.Router();

/* eslint-disable prettier/prettier */
// passport.authenticate() is basically used to call the local strategy function
passportRoutes.post('/api/auth', (request, response, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return response.status(401).json({ message: 'Authentication failed' });
        }
        request.logIn(user, (authError) => {
            if (authError) {
                return next(authError);
            }
            return response.status(200).json({ message: 'Authentication successful', authenticatedUser: user });
        });
    })(request, response, next);
});

// passport.authenticate() is basically used to call the local strategy function
passportRoutes.get(
    '/api/auth/status',
    (request, response) => {
        console.log('Inside /auth/status endpoint');
        console.log(request.user);
        // if (request.user) {
        //     response.status(200).send(request.user);
        // }
        // eslint-disable-next-line max-len
        return request.user ? response.status(200).send(request.user) : response.status(401).send({ status: false });
    },
);

// setup logout
passportRoutes.post(
    '/api/auth/logout',
    (request, response) => {
        console.log('Inside /auth/status endpoint');
        if (!request.user) {
            response.sendStatus(401).send({ msg: 'Not logged in' });
        }
        request.logout((error) => {
            if (error) {
                return response.status(400).send({ msg: 'Something went wrong' });
            }
            return response.status(200).send({ msg: 'Logout successfull.' });
        });
    },
);

export default passportRoutes;
