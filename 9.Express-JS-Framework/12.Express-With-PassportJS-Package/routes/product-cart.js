/* eslint-disable consistent-return */
const express = require('express');

const routes = express.Router(); // Change this line to use Router() instead of Route()

routes.post('/auth/cart', (request, response) => {
    if (!request.session.user) {
        return response.status(401).send({ msg: 'Unauthecated user' });
    }
    // take the body request object and renmae it to item through { body: item }
    const { body: item } = request;
    const { cart } = request.session;
    if (cart) {
        cart.push(item);
    } else {
        request.session.cart = [item];
    }
    return response.status(201).send(item);
});

routes.get('/auth/cart', (request, response) => {
    if (!request.session.user) {
        return response.status(401).send({ msg: 'Unauthecated user' });
    }

    return response.status(201).send(request.session.cart ? request.session.cart : []);
});

module.exports = routes;
