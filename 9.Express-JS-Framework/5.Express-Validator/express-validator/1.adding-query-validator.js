// dependencies
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const { query } = require('express-validator');

// setup app scaffold
const app = {};

// initiate express
app.startApp = express();

// setup built-in middleware
app.startApp.use(express.json());

// route setup with query validator on 'msg' => notEmpty()
// eslint-disable-next-line consistent-return
app.startApp.get('/message', [query('msg').notEmpty()], (request, response) => {
    // const { errors } = response;

    // if (!errors.isEmpty()) {
    //     return response.status(400).json({ message: errors });
    // }

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

// const app = express();
// app.use(express.json());

// app.get('/message', [query('msg').notEmpty()], (request, response) => {
//     const message = 'Hello';
//     return response.send(`${message} ${request}`);
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Listen on port: ${PORT}`);
// });
