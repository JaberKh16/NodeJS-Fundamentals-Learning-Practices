const express = require('express');
const { body, validationResult, matchedData } = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

// setup json body parser
app.use(express.json());

// setup cookie
// app.use(cookieParser());

// setup session middlware setup
app.use(
    session({
        secret: 'Session-Key',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: Number(3000 * 60),
        },
    }),
);

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
            const newUserData = {
                email: data.email,
                password: data.password,
            };

            // set up session
            req.session.userData = newUserData;

            const sessionInfo = {
                sessionObj: req.session,
                sessionId: req.sessionID,
            };

            req.sessionStore.get(req.sessionID, (error, sessionData) => {
                if (error) {
                    console.log(error);
                    throw error;
                }
                console.log(sessionData);
            });
            return res
                .status(201)
                .json({ message: 'User created successfully', sessionData: sessionInfo });
        }
    }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
