/*
    Customizing Express Validators & Sanitizers
    ===========================================
    Custom Validators and Sanitizers are simple functions that receive
    the field value and some information about it and have to return a
    value that will determine if the field is valid or not.

    Custom Validators
    -----------------
    Definition: function custom (value){}
    Return type: must return a truthy or falsy value

    Custom Sanitizers
    -----------------
    Definition: function custom (value){}
    Return type: must return a truthy or falsy value

    Error Message
    -------------
    Whenever a field value is invalid, an error message is recorded for it.
    The default error message is 'Invalid value', which is not descriptive at
    all of what the error is, so you might need to customize it.

    Normal validator message- withMessage() function

        body('email').isEmail().withMessage('Not a valid e-mail address');

    Custom Validator Message-
        body('email')
            .isEmail()
            .custom(async value => {
                const existingUser = await Users.findByEmail(value);
                if (existingUser) {
                // Will use the below as the error message
                throw new Error('A user already exists with this e-mail address');
                }
            });
    Field Level Message
    -------------------
    Field levle message can be set with field while creating the validation
    chain, It is basically used as fallback message when a validator doesn't
    override its error message.

        body('json_string', 'Invalid json_string')
            // No message specified for isJSON, so use the default "Invalid json_string"
            .isJSON()
            .isLength({ max: 100 })
            // Overrides the default message when `isLength` fails
            .withMessage('Max length is 100 bytes');

    Other Error Messages Functions
    ------------------------------
    Some 'express-validator' function which create a different error type and offer
    a different way to specify an error message.

        a. checkExact()
        b. oneOf()

    Using Class Way
    ---------------
    A useful way to reuse certain customizations is to use the 'ExpressValidator' class.

    It contains all the functions that can import directly from 'express-validator' such as-
    body, matchedData, oneOf, validationResult, etc, but with customizations that you specify
    when instantiating it.
    Example-
        import { ExpressValidator } from 'express-validator';

        const { body, validationResult } = new ExpressValidator(
            {
                isPostID: async value => {
                // Verify if the value matches the post ID format
                },
            },
            {
                muteOffensiveWords: value => {
                // Replace offensive words with ***
                },
            },
        );

*/

// custome sanitizers
import { param } from 'express-validator';
import { ObjectId } from 'mongodb';

const express = require('express');
const { body } = require('express-validator');

const app = express();

app.use(express.json());

// custom validators
app.post(
    '/create-user',
    [
        body('password').isLength({ min: 3 }),
        body('passwordConfirmation').custom(
            (value, { request }) => value === request.body.password,
        ),
    ],
    (request, response) => response.send(200)
);

// custom sanitizers
app.post(
    '/user/:id',
    param('id').customSanitizer((value) => ObjectId(value)),
    (req, res) => {
        // req.params.id is an ObjectId now
    },
);
