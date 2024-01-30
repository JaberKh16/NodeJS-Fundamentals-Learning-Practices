/*
    Express With PassportJS Integration
    ====================================

*/
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
const express = require('express');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportRoutes = require('../routes/passport-auth');

const app = express();

// set built-in json middleware
app.use(express.json());
// work with cookie parser
app.use(cookieParser());
// work wtih session
app.use(
    session({
        secret: 'Session-Key',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: Number(3000 * 60),
        },
    }),
);

// initialize passport
app.use(passport.initialize());
// setup passport session
app.use(passport.session());
// setup passport routes
app.use(passportRoutes);

app.get('/', (request, response) => {
    const sessionInfo = {
        sessionObj: request.session,
        sessionId: request.sessionID,
    };
    console.log(sessionInfo);
    // to modify session to be persistence
    request.session.visited = true;
    // getting session history
    request.sessionStore.get(request.sessionID, (error, sessionData) => {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log(sessionData);
    });
    return response.status(200).send(sessionInfo);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
