/*
    Express Cookies And Session Concepts
    ====================================
    Cookies are a small chunk of memory that browser uses to store request
    sender information. Its stores on the client side - on browser.

    Session are a small chunk of memory that server uses to store client
    info to identify the client. When session is set it add a session object
    containing a json object of {session-id:cookie_value} which then used to
    identify the client.

    Set A Cookie
    ------------
    To set a cookie - basically response object has the cookie()

        response.cookie('cookie_name', 'cookie_value', option: {});

    Library To Work With Cookie Parsing
    -----------------------------------
    'cookie-parser' library is used to work with cookie parsing work.
    To install use the commnad-
        $ npm i --save cookie-parser

    This library provides a function named - cookieParser() to work with
    cookie parsing as well as set signed cookies.
    Though it is a middle so need to access through use() function, but need
    to remember that this middleware must be defined before the routes
    middleware otherwise cannot access the cookies.

    So to used the cookieParser() function do the following-

        const cookieParser = require('cookie-parser');
        app.use(cookieParser()); // default is non signed cookies
        app.use(cookieParser('some-content')); // defined signed cookies

    To access signed cookies do the following-

        request.cookies.cookie_name; // to access non signed cookies
        request.signedCookies.signed_cookie_name; // to access signed cookies

    Library To Work With Session
    ----------------------------
    'cookie-session' library is used to work with session work.
    To install use the commnad-
        $ npm i --save express-session

    This library provides a function named - session() to work with
    the session.
    Though it is a middle so need to access through use() function, but need
    to remember that this middleware must be defined before the routes
    middleware otherwise cannot access the cookies.

    So to used the session() function do the following-

        const session = require('express-session');
        app.use(session({
            secret: '', // to set secret key
            saveUninitialized: boolean, // to set session while visiting
            resave: boolean, // forces session to store on modification
            cookie:{ // to store the timing of the session expires
                maxAge: number
            }
        }));

    To access session do the following-

        request.session; // to access session object
        request.session.id; // to access session id
        request.sessionId; // to access session id

    Though with every request each time new session is generated thus
    new session object and session id. So, need to modify the session
    object through 'express-session' to track the particular client info.

    To modify session object-
        request.session.visited = boolean; // to setup session id not changing on request

*/
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
const express = require('express');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const userRoutes = require('../routes/user-route');

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
        resave: true,
        cookie: {
            maxAge: Number(3000 * 60),
        },
    }),
);
// setup the user routes
app.use(userRoutes);

app.get('/', (request, response) => {
    const sessionInfo = {
        sessionObj: request.session,
        sessionId: request.sessionID,
    };
    console.log(sessionInfo);
    // to modify session to be persistence
    request.session.visited = true;
    return response.status(200).send(sessionInfo);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
