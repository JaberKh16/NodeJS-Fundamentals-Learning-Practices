const express = require('express');
const errorConstant = require('./error-contastant');

const handler = {};

handler.errorHandler = (error, request, response, next) => {
    const statusCode = response.statusCode ? response.statusCode : 500;
    switch (statusCode) {
        case errorConstant.VALIDATION_ERROR:
            response.json({
                title: 'Validation failed',
                message: error.message,
                stackTracer: error.stack,
            });
            break;
        case errorConstant.UNAUTHORIZE_ERROR:
            response.json({
                title: 'Unauthorize error',
                message: error.message,
                stackTracer: error.stack,
            });
            break;
        case errorConstant.FORBIDDEN_ERROR:
            response.json({
                title: 'Resource forbidden',
                message: error.message,
                stackTracer: error.stack,
            });
            break;
        case errorConstant.NOT_FOUND_ERROR:
            response.json({
                title: 'Page not found',
                message: error.message,
                stackTracer: error.stack,
            });
            break;
        default:
            break;
    }
};

module.exports = handler;
