const { body } = require('express-validator');

const userValidationSchema = [
    // Validation for userName
    body('userName')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 5 })
        .withMessage('Username must be at least 5 characters long'),

    // Validation for password
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
];

module.exports = {
    userValidationSchema,
};
