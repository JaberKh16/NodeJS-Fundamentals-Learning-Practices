/* eslint-disable consistent-return */
/* eslint-disable quotes */
/* eslint-disable radix */
/* eslint-disable no-restricted-globals */
// dependencies
const express = require('express');
const users = require('../data/users-data');

// creating instance of express
const app = express();

// setup port number
const PORT = process.env.PORT || 3000;
// setup routes
app.get('/', (req, res) => {
    res.send('Welcome to the page');
});

app.get('/api/users', (req, res) => {
    res.send({ users });
});

// route params
app.get('/api/users/:id', (req, res) => {
    const { params } = req;
    console.log(params);
    const parsedId = parseInt(params.id);
    if (isNaN(parsedId)) {
        return res.status(400).send({ message: 'Bad Request' });
    }
    const findUser = users.usersInfo.find((user) => user.id === parsedId);
    if (!findUser) {
        return res.sendStatus(404);
    }
    return res.send(findUser);
});

// setup query string
// url - localhost:3000/api/users/filter?key1=value1&key2=value2
app.get('/api/filter/user', (req, res) => {
    console.log(req.query);
    const { filterCriteria, value } = req.query;

    // when query parameter is undefined
    if (!filterCriteria && !value) {
        return res.send(users);
    }
    if (filterCriteria && value) {
        // filter users based on the filterCriteria and value
        const filteredUsers = users.usersInfo.filter((user) => {
            // check if the property exists and is a string or an array
            const userProperty = user[filterCriteria];
            if (typeof userProperty === 'string') {
                return userProperty.includes(value);
            }
            if (Array.isArray(userProperty)) {
                return userProperty.includes(value);
            }
            return false;
        });

        return res.send(filteredUsers);
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
