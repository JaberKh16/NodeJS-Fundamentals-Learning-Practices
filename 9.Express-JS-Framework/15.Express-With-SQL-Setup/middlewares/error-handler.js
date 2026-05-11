const handlers = {};

handlers.errorConstant = {
    VALIDATION_ERROR: 400,
    UNAUTHORIZE_ERROR: 401,
    FORBIDDEN_ERROR: 403,
    NOT_FOUND_ERROR: 404,
};

handlers.errorHandler = (error, request, response, next) => {
    const statusCode = response.statusCode ? response.statusCode : 500;
    switch (statusCode) {
        case handlers.errorConstant.VALIDATION_ERROR:
            response.json({
                title: 'Validation failed',
                message: error.message,
                stackTracer: error.stack,
            });
            break;
        case handlers.errorConstant.UNAUTHORIZE_ERROR:
            response.json({
                title: 'Unauthorize error',
                message: error.message,
                stackTracer: error.stack,
            });
            break;
        case handlers.errorConstant.FORBIDDEN_ERROR:
            response.json({
                title: 'Resource forbidden',
                message: error.message,
                stackTracer: error.stack,
            });
            break;
        case handlers.errorConstant.NOT_FOUND_ERROR:
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

module.exports = handlers;
