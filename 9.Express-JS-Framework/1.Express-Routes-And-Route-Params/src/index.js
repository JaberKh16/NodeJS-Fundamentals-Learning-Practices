/*
    Routing Concepts In Express
    ===========================
    Routing refers to determining how an application responds
    to a client request to a particular endpoint, which
    is a URI (or path) and a specific HTTP request method like-
    (GET, POST, and so on).

    Each route can have one or more handler functions, which are
    executed when the route is matched.

    Syntax:
        app.Method(path, handler);

    Some Use Case Of Express Instance
    ---------------------------------
    a. app.all()    --> to handle all HTTP methods
    b. app.use()    --> to specify middleware as callback
    c. app.get()    --> to perform HTTP GET reuqest
    d. app.post()   --> to perform HTTP POST reuqest
    e. app.put()    --> to perform HTTP PUT reuqest
    f. app.patch()  --> to perform HTTP PATCH reuqest
    g. app.delete() --> to perform HTTP DELETE reuqest
    h. app.route()  --> to create a chaining of routes.

    Routing methods can have more than one callback function as arguments.
    With multiple callback functions it its important to provide next()
    as an argument to the callback function to call the next callback. It
    is basically a concept of middleware, where next() is used to controll
    the next route work flows.

    Route Paths
    -----------
    Route paths, in combination with a request method, define the endpoints
    at which requests can be made. Route paths can be- strings, string patterns,
    or regular expressions.

    The characters ?, +, *, and () are subsets of their regular expression counterparts.
    The hyphen (-) and the dot (.) are interpreted literally by string-based paths.

    Note:
    Express uses 'path-to-regexp' for matching the route paths.
    See the path-to-regexp documentation-

        [https://www.npmjs.com/package/path-to-regexp]

    Express Route Tester is a handy tool for testing basic Express
    routes, although it does not support pattern matching.
        [http://forbeslindesay.github.io/express-route-tester/]

    Router Params
    -------------
    Route parameters are- Named URL segments that are used to capture the
    values specified at their position in the URL. The captured values
    are populated in the 'req.params' object, with the name of the
    route parameter specified in the path as their respective keys.

    Route handlers
    --------------
    If wanted can provide multiple callback functions that behave like- Middleware
    to handle a request. The only exception is that these callbacks might invoke
    next('route') to bypass the remaining route callbacks. You can use this mechanism
    to impose pre-conditions on a route, then pass control to subsequent routes
    if there’s no reason to proceed with the current route.

    Route handlers can be in the form of a function, an array of functions,
    or combinations of both.

    Example-
        const cb0 = function (req, res, next) {
            console.log('CB0')
            next()
        }

        const cb1 = function (req, res, next) {
            console.log('CB1')
            next()
        }

        const cb2 = function (req, res) {
            res.send('Hello from C!')
        }

        app.get('/example/c', [cb0, cb1, cb2])

    Response Methods
    ----------------
    The methods on the response object (res) in the following can send a
    response to the client, and terminate the request-response cycle.
    If none of these methods are called from a route handler,
    the client request will be left hanging. Following methods are:
        a. res.download()   --> prompt a file to be downloaded
        b. res.end()        --> to end the response process
        c. res.json()       --> to send a json response
        d. res.jsonp()      --> to send a json response with JSONP support
        e. res.redirect()   --> to redirect a request
        f. res.render()     --> to render a view template
        g. res.send()       --> to send a response of various types
        h. res.sendFile()   --> to send a file as an octet stream
        i. res.sendStatus() --> to set the response status code and send its
                                string representation as the response body

    Request Object Properties
    ------------------------
        a. req.body     --> body of http request
        b. req.cookies  --> cookies of http request
        c. req.headers  --> headers of http request
        d. req.params   --> parameters of http
        e. req.query    --> query of http request

    Express Route Class
    -------------------
    'express.Router' class to create modular, mountable route handlers.
    A Router instance is a complete middleware and routing system; for
    this reason, it is often referred to as a “mini-app”.
    Example-
        const express = require('express')
        const router = express.Router()

        // middleware that is specific to this router
        router.use((req, res, next) => {
            console.log('Time: ', Date.now())
            next()
        })
        // define the home page route
        router.get('/', (req, res) => {
            res.send('Birds home page')
        })
        // define the about route
        router.get('/about', (req, res) => {
            res.send('About birds')
        })

        module.exports = router;

*/
/* eslint-disable quotes */
/* eslint-disable radix */
/* eslint-disable no-restricted-globals */
// importing
const express = require('express');
const users = require('../data/users-data');

// creating instance of express
const app = express();

// setup port number
const PORT = process.env.PORT || 3000;
// setup routes
app.get('/', (req, res) => {
    res.send('Welcome to the page');
});

app.get('/api/users', (req, res) => {
    res.send({ users });
});

// route params
app.get('/api/users/:id', (req, res) => {
    const { params } = req;
    console.log(params);
    const parsedId = parseInt(params.id);
    // console.log(parsedId);
    if (isNaN(parsedId)) {
        return res.status(400).send({ message: 'Bad Request' });
    }
    const findUser = users.usersInfo.find((user) => user.id === parsedId);
    if (!findUser) {
        return res.sendStatus(404);
    }
    return res.send(findUser);
});
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
