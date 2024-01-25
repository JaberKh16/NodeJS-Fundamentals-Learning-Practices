/*
    Application Level Middleware Concepts
    =====================================
    Bind Application-Level Middleware to an instance of the app object
    by using the app.use() and app.METHOD() functions, where
    METHOD is the HTTP method of the request that the middleware
    function handles (such as GET, PUT, or POST) in lowercase.

*/
const express = require('express');

const app = express();

// skipping the rest of the middleware function from a router
// middleware stack call next('route') to pass control to
// the next route.
// Note: next('route') will work only in middleware functions that
// were loaded by using the app.method() or route.method() functions.
app.get(
    '/user/:id',
    (req, res, next) => {
        // if the user ID is 0, skip to the next route
        if (req.params.id === '0') next('route');
        // otherwise pass the control to the next middleware function in this stack
        else next();
    },
    (req, res, next) => {
        // send a regular response
        res.send('regular');
    },
);

// handler for the /user/:id path, which sends a special response
app.get('/user/:id', (req, res, next) => {
    res.send('special');
});

// middleware as an array of reusuability
function logOriginalUrl(req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
}

function logMethod(req, res, next) {
    console.log('Request Type:', req.method);
    next();
}

const logStuff = [logOriginalUrl, logMethod];
app.get('/user/:id', logStuff, (req, res, next) => {
    res.send('User Info');
});
