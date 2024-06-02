const express = require('express');
const { validationResult, matchedData, checkSchema } = require('express-validator');
const users = require('../data/users-data');
const { userSchema }  = require('../src/validating-schema/userValSchema');

// creating instance of express
const app = express();

// Middleware to parse JSON
app.use(express.json());

// setup port number
const PORT = process.env.PORT || 3000;

app.get('/api/users', (req, res) => {
    res.send({ users });
});

// use of validation schema
app.post('/api/users', checkSchema(userSchema), (req, res) => {
    console.log('Incoming data:', req.body); // Log incoming data
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        console.error('Validation errors:', validationErrors.array()); // Log validation errors
        return res.status(400).json({ errors: validationErrors.array() });
    }
    const data = matchedData(req);
    console.log('Validated data:', data); // Log validated data
    if (data) {
        const newUser = {
            id: users.usersInfo[users.usersInfo.length - 1].id + 1,
            ...data,
        };
        // push to the array
        users.usersInfo.push(newUser);
        return res.status(201).send(users);
    }
});


// listen request
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
