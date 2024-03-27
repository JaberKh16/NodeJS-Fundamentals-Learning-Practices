/* eslint-disable import/named */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// const productRoutes = require('../routes/product-routes');
import express from 'express';
import { errorHandler } from '../middlewares/error-handler';
import { notesRoutes } from '../routes/notes-routes';

const app = express();

// setup middleware
app.use(express.json());

// setup error handlers
app.use(errorHandler);

// setup notes route
app.use(notesRoutes);

// setup app environemnt
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
