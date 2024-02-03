const { body, validationResult } = require('express-validator');

const schema = {};
schema.createUserValidationSchema = () => [
    body('userName')
        .isString()
        .withMessage('Must be a string.')
        .isLength({ min: 2, max: 10 })
        .withMessage('Length must be 2-10 characters')
        .notEmpty()
        .withMessage("Can't pass an empty string"),

    body('displayName')
        .isString()
        .withMessage('Must be a string.')
        .isLength({ min: 2, max: 10 })
        .withMessage('Length must be 2-10 characters')
        .notEmpty()
        .withMessage("Can't pass an empty string"),

    body('password')
        .isString()
        .withMessage('Must be a string.')
        .isLength({ min: 5, max: 10 })
        .withMessage('Length must be 5-10 characters')
        .notEmpty()
        .withMessage("Can't pass an empty string"),
];

module.exports = schema;
