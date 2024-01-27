/*
    Express Error Handling Concepts In Express
    ==========================================
    Error Handling refers to how Express catches and process errors
    that occurs both synchronously and asynchronously. Express comes
    with a default error handler.

    Errors can be happened in route hanlind and middleware.

    Erros On Synchronous Block Code
    -------------------------------
    Erros that occur in synchronous code inside route handlers and middleware
    require no extra work. If synchronous code throws an error, then Express
    will catch and process it.
    Example-
        app.get('/', (req, res)=>{
            throw new Error('BROKEN'); // express will catch this on its won
        })

    Error On Asynchronous Block Code
    --------------------------------
    Errors happens from asynchronous block let's say happens from
    asynchronous functions invoked by route handlers and middleware, need to
    pass them to the next() function so that Express can catch and process them.
    Example-
        app.get('/', (req, res, next)=>{
            fs.readFile('path', (err, data)=>{
                if(err){
                    next(err);
                }else{
                    res.send(data);
                }
            })
        })

    Now, From Express 5, route handlers and middleware that return a Promise will
    call next(value) automatically when they reject or throw an error.
    Example-
        app.get('/user/:id', async(req, res, next)=>{
            const user = await getUserById(req.params.id);
            res.send(user);
        })
    If 'getUserById' function which is awaiting for the Promise to resolve if get any errors
    then 2 scenario happens which are following-

        1. next() will be called with either the thrown error or the rejected value.
        2. If no rejected value is provided, next() will be called with default Error Object
           provides by Express Router.

    If pass anything to the next() function (except the string 'route'), Express regards the
    current request as being 'an error' and will skip any remaining non-error handling routing
    and middleware functions.
    Example-
        app.get('/', [
            function (req, res, next){
                fs.writeFile('path', 'data', next);
            },
            function (req, res){
                res.send('OK');
            }
        ]);
    In the above code, next is provided as callback for fs.writeFile()
    which is called with or without errors and if there is no erros then
    the second handler/middleware is excuted, otherwise Express handles
    thrown errors.

    Asynchronous Handling Example-
        app.get('/', (req, res, next) => {
            setTimeout(() => {
                try {
                throw new Error('BROKEN')
                } catch (err) {
                next(err)
                }
            }, 100)
        }
    Since Promises automatically catch both synchronous errors and rejected promises,
    can simply provide next as the final catch handler and Express will catch errors,
    because the catch handler is given the error as the first argument.
    Example-
        app.get('/', (req, res, next) => {
            Promise.resolve().then(() => {
                throw new Error('BROKEN')
            }).catch(next) // Errors will be passed to Express.
        })

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
