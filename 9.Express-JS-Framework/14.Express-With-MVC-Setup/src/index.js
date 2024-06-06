/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const dotenv = require('dotenv');
const notesRoutes = require('../routes/notes.routes');

dotenv.config();

const app = express();

app.use(express.json());

// setup product routes
app.use('/api/notes', notesRoutes);

// setup app environemnt
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
