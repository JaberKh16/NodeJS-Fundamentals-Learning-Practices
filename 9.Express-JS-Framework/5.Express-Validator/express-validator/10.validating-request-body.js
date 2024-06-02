const express = require('express');
const { body, macthedData, validationResult, matchedData } = require('express-validator');

const users = require('../data/users-data');


const app = express();
const PORT = process.env.PORT || 3000;

// setup body parser
app.use(express.json());


app.post('/api/users', [ body('userName').notEmpty().withMessage('must required field')
                            .isString().withMessage('must be a string')
                            .isLength({min:2, max:10}).withMessage('must be between 2 and 10 characters'),
                        body('displayName').notEmpty().withMessage('must required field')
                            .isString().withMessage('must be a string')
                            .isLength({min:2, max:10}).withMessage('must be between 2 and 10 characters'),
                        ], 
                    (req, res) =>{
                        // get the validation errors
                        const validationErrors = validationResult(req);
                        if(!validationErrors.isEmpty()){
                            return res.status(400).json({errors: validationErrors.array() })
                        }
                        // get the validated data
                        const data = matchedData(req);
                        console.log(data);

                        const newUser = {
                            id: users.usersInfo[users.usersInfo.length - 1].id + 1,
                            ...data
                        }

                        // push to the array
                        users.usersInfo.push(newUser);
                        return res.status(201).send(newUser);

                    }
);


// listen request
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});