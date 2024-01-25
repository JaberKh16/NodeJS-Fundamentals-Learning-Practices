/*
    Error Handling Middleware Concepts
    ==================================
    Error-handling middleware always takes four arguments.
    Must provide four arguments to identify it as an
    error-handling middleware function.

    Even if you don’t need to use the next object, you must
    specify it to maintain the signature. Otherwise,
    the next object will be interpreted as regular middleware
    and will fail to handle errors.

*/

const express = require('express');

const app = express();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
