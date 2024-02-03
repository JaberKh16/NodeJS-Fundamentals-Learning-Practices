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
/* eslint-disable radix */
const express = require('express');

const app = express();

// Middleware to simulate an error with a specific status code
app.get('/simulate-error/:statusCode', (req, res, next) => {
    const statusCode = parseInt(req.params.statusCode);
    const error = new Error(`Simulated error with status code ${statusCode}`);
    error.statusCode = statusCode;
    next(error);
});

// Error handler middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Default to 500 if status code is not set
    res.status(statusCode).json({
        success: false,
        error: {
            message: err.message || 'Internal Server Error',
            statusCode,
        },
    });
});
