/*
    Express Cookie Parser Concepts
    ==============================
    HTTP Cookies are ways to store user information some sort of information in the browser.
    Express provides a package like - cookie-parser, cookie to work with the cookies.

    Cookie Parser Package
    ---------------------
    a. to install the package
        $ npm i cookie-parser
    b. to setup cookie
        request.cookie('key', data, options:{}); // optins can be 'httpOnly', 'maxAge', 'signed'
    c. to access cookie
        request.cookies
    d. to setup signed cookie
        const cookieParser = require('cookie-parser');
        app.use(cookieParser('signedKey'));  // any string based signed can be used
        request.cookie('key', data, {maxAge: 60* 60 * 60 , signed:true}
    e. to clear cookie
        response.clearCookie('key')
*/

const express = require('express');
const { body, validationResult, matchedData } = require('express-validator');
const cookieParser = require('cookie-parser');

const app = express();

// setup json parser
app.use(express.json());

// setup cookie parser
app.use(cookieParser());

app.post(
    '/api/users/create',
    [
        body('email')
            .notEmpty()
            .withMessage('Email is a required field')
            .isString()
            .withMessage('Email must be a string')
            .isEmail()
            .withMessage('Email must be a valid email'),
        body('password')
            .notEmpty()
            .withMessage('Password is a required field')
            .isString()
            .withMessage('Password must be a string')
            .isLength({ min: 6, max: 8 })
            .withMessage('Password must contain at least 6 and at most 8 characters'),
    ],
    (req, res) => {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ errors: validationErrors.array() });
        }

        const data = matchedData(req);
        if (data) {
            // set up cookie (example cookie setup)
            // syntax: req.cookie('key', data, options:{})
            // options:{httpOnly, maxAge}
            const newUserData = {
                email: data.email,
                password: data.password,
            };
            res.cookie('userData', newUserData, { httpOnly: true, maxAge: 60 * 60 * 1000 });

            console.log(req.cookies);
            console.log(newUserData);
        }
        return res.status(201).json({ message: 'User created successfully', data });
    }
);

const PORT = process.env.PORT || 3000;

// listening
app.listen(PORT, () => {
    console.log(`Server is listening on port:${PORT}`);
});
