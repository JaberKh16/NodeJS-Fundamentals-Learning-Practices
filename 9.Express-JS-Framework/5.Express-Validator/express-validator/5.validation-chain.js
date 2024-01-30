/*
    Validation Chaining Concepts In Express Validator
    =================================================
    Validation Chains are created by function such as
    - body(), param(), query(), header() etc.

    They have this name because they wrap the value of a field
    with validations or sanitizations and each of its methods
    return itself. This pattern is usually called Method Chaining.

    Validation chains not only have a number of useful methods for
    defining validations and sanitizations but they also middleware
    functions, meaning that they can be passed to any express router
    handler.

    Validation Chain Features
    ------------------------
    a. Validators --> determine if the value of a request field is valid means
                      it in the format that you would expect it to be.
    b. Sanitizers --> to transform or cast the field value into correct type,
    c. Modifiers  --> to define how validation chains behave when they run which might
                      include adding conditions on when they should run or even
                      which error message a validator should have.

    Note: Though most methods of validators and sanitizers are come form validatiors.js
    library which work with strings. Thus-

        a. Primitive Types- 'express-validator' will always convert fields with a
                            a standard validator/sanitizer to strng first.

        b. Non-Primitive Types-
            1. Date Object          --> use return of toISOString()
            2. null, undefined, NaN --> convert to '' string
            3. Object Custom String --> use custom toString() method
            4. Object Norma         --> use default toStirng() method
            5. Other Values         --> convert to boolean or numbers

    Some Validators And Sanitizers
    ------------------------------
    a. isEmail()
    b. isLength()
    c. isISBN()
    d. isMultibyte()
    e. toISOString()
    f. toString()

    Note: Chaining order of validator is matters means in the chaining
    whatever method come first that will work execute first and then the
    executed result passed to the next function for further validation check,

    Thus, Validation Chains are mutable means calling of the methods will
    cause the original chain object to be updated.
    Example-
        const createEmailChain = () => body('email').isEmail();
        app.post('/login',
            createEmailChain(),
            handleLoginRoute
        );
        app.post('/signup',
            createEmailChain().custom(checkEmailNotInUse),
            handleSignupRoute
        );

*/

/* eslint-disable comma-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();

app.post(
    '/newsletter',
    // For the `email` field in `req.body`...
    [body('email').trim().isEmail()],
    (request, response) => {
        const errors = validationResult(request);
        if (!errors) {
            return response.status(400).send({ message: errors.array() });
        }
        return response.status(200);
    }
);
