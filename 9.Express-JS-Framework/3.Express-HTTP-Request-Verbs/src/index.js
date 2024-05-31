/* eslint-disable consistent-return */
/* eslint-disable quotes */
/* eslint-disable radix */
/* eslint-disable no-restricted-globals */
const express = require('express');
const users = require('../data/users-data');

// creating instance of express
const app = express();

// middleware
app.use(express.json()); // getting json setup

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
app.get('/api/filter/users', (req, res) => {
    const {
        query: { filter, value },
    } = req;
    console.log(req.query);
    // when query parameter is undefined
    if (!filter && !value) {
        return res.send(users);
    }
    if (filter && value) {
        const filteredUser = users.usersInfo.filter((user) => {
            const userProperty = user[filter];
            if (typeof userProperty === 'string') {
                return userProperty.includes(value);
            }
            if (Array.isArray(userProperty)) {
                return userProperty.includes(value);
            }
            return false;
        });
        return res.send(filteredUser);
    }
});

// post request - setup request body with new item {}
app.post('/api/users', (req, res) => {
    console.log(req.body);
    const { userName, displayName } = req.body;

    if (req.body.id) {
        const parsedId = parseInt(req.body.id);
        if (parsedId) {
            const existedUser = users.usersInfo.find((user) => user.id === parsedId);
            if (!existedUser) {
                const newUsers = {
                    // eslint-disable-next-line max-len
                    id: users.usersInfo[users.usersInfo.length - 1].id + 1, // set the id of the user
                    ...req.body, // body has the request body response
                };
                console.log(users.usersInfo.length);
                // users.usersInfo.push(newUsers);
                // send the updated users array in the response
                return res.status(201).send(newUsers);
            }
            return res.status(200).send({ message: 'User id already existed.' });
        }
    }
});

// put request - full update
app.put('/api/users/:id', (req, res) => {
    const {
        body,
        params: { id },
    } = req;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return res.sendStatus(400);
    }

    const findUserIndex = users.usersInfo.findIndex((user) => user.id === parsedId);

    if (findUserIndex === -1) {
        return res.sendStatus(404);
    }

    // Update the found user in the users array
    users.usersInfo[findUserIndex] = {
        id: parsedId,
        ...body,
    };

    // send the updated users array in the response
    return res.status(200).send(users);
});

// patch request - partial update
app.patch('/api/users/:id', (req, res) => {
    const {
        body,
        params: { id },
    } = req;
    console.log(id);
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return res.sendStatus(400);
    }
    const findUserIndex = users.usersInfo.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) {
        return res.sendStatus(404);
    }
    users.usersInfo[findUserIndex] = {
        ...users.usersInfo[findUserIndex],
        ...body,
    };
    return res.status(200).send(users);
});

// delete request
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
        return res.sendStatus(400);
    }

    const findUserIndex = users.usersInfo.findIndex((user) => user.id === parsedId);

    if (findUserIndex === -1) {
        return res.sendStatus(404);
    }

    users.usersInfo.splice(findUserIndex, 1);

    return res.sendStatus(200);
});

// listen request
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
