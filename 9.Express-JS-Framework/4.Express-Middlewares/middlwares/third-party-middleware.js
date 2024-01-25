/*
    Third-Party Middleware Concepts
    ===============================
    Use third-party middleware to add functionality to Express apps.

    Install the Node.js module for the required functionality,
    then load it in your app at the application level or at the
    router level.

   Let's install and load the cookie-parsing middleware function
   cookie-parser.

    $ npm install cookie-parser

*/

const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');

// load the cookie-parsing middleware
app.use(cookieParser());
