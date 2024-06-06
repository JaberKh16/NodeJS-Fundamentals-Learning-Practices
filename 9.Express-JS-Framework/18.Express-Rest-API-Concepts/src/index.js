// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const logger = require('../utils/log.generate');
// eslint-disable-next-line import/no-unresolved
const userRoutes = require('../routes/user.routes');

const app = express();

// setup middlewares
app.use(express.json());

// setup the logger
app.use(morgan('combined', { stream: logger() }));

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server listening on port:${PORT}`);
});
