// dependencies
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const { query } = require('express-validator');

// setup app scaffold
const app = {};

// initiate express
app.startApp = express();

// setup built-in midlware
app.startApp.use(express.json());

// route setup with query validator on 'msg' => notEmpty()
// eslint-disable-next-line consistent-return
app.startApp.get('/message', [query('msg').notEmpty()], (request, response) => {
    const errors = response.errors();
    if (!errors.isEmpty()) {
        return response.send(400).json({ message: errors });
    }
    const message = 'Hello';
    response.send(`${message} ${request.query.person}`);
});

// setup configuration
app.configuration = process.env.PORT || 3000;

// listen
app.startApp.listen(app.configuration, () => {
    console.log('Listen on port: ', app.configuration);
});

// export
module.exports = app;
