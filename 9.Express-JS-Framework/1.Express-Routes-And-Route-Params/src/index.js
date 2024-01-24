/*
    Routing Concepts In Express
    ===========================
    Routing refers to determining how an application responds
    to a client request to a particular endpoint, which
    is a URI (or path) and a specific HTTP request method like-
    (GET, POST, and so on).

    Each route can have one or more handler functions, which are
    executed when the route is matched.

    Syntax:
        app.Method(path, handler);

*/
/* eslint-disable quotes */
/* eslint-disable radix */
/* eslint-disable no-restricted-globals */
const express = require('express');

// creating instance of express
const app = express();

// setup port number
const PORT = process.env.PORT || 3000;
// setup routes
app.get('/', (req, res) => {
    res.send('Welcome to the page');
});

app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, userName: 'adi', displayName: 'Adi' },
        { id: 2, userName: 'mark', displayName: 'Mark' },
        { id: 4, userName: 'niyal', displayName: 'Niyal' },
    ];
    res.send({ users });
});

// route params
const users = [
    { id: 1, userName: 'adi', displayName: 'Adi' },
    { id: 2, userName: 'mark', displayName: 'Mark' },
    { id: 4, userName: 'niyal', displayName: 'Niyal' },
];
app.get('/api/users/:id', (req, res) => {
    const { params } = req.params;
    console.log(params);
    const parsedId = parseInt(params.id);
    if (isNaN(parsedId)) {
        return res.status(400).send({ message: 'Bad Request' });
    }
    const findUser = users.find((user) => user.id === parsedId);
    if (!findUser) {
        return res.sendStatus(404);
    }
    return res.send(findUser);
});
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
