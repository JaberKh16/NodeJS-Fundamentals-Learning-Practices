/*
    Route Level Middleware Concepts
    ===============================
    Router-Level Middleware works in the same way as Application-Level Middleware,
    except it is bound to an instance of express.Router()/

        const router = express.Router();

    Loading Route Level Middleware using the router.use() or router.method()
    functions.

*/

const express = require('express');

const app = express();
const router = express.Router();

// a middleware with no mout point
router.use((req, res, next) => {
    console.log(`Time: ${Date.now()}`);
    next();
});

// a middleware sub-stack with HTTP methods
router.use(
    '/user/:id',
    (req, res, next) => {
        console.log(`Request URL: ${req.originalUrl}`);
        next();
    },
    (req, res, next) => {
        console.log(`Request Type: ${req.method}`);
        next();
    }
);
