const express = require('express');
const { validationResult, matchedData, checkSchema } = require('express-validator');
const users = require('../data/users-data');
const { userSchema }  = require('../src/validating-schema/userValSchema');

// creating instance of express
const app = express();

// setup port number
const PORT = process.env.PORT || 3000;

app.get('/api/users', (req, res) => {
    res.send({ users });
});

// use of validation schema
app.post('/api/users', checkSchema(userSchema), (req, res) => {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.status(400).json({errors: validationErrors.array() });
    }
    const data = matchedData(req);
    console.log(data);
    if(data){
        const newUser = {
            id: users.usersInfo[users.usersInfo.length - 1].id + 1,
            ...data,
        }
        // push to the array
        users.usersInfo.push(newUser);
        return res.status(201).send(users);
    }
})


// listen request
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
