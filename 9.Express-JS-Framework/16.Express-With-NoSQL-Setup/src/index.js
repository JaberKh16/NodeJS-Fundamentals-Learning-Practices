/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-extraneous-dependencies */
// const productRoutes = require('../routes/product-routes');
require('dotenv').config();
const express = require('express');
const connectDB = require('../database-setup/db.config');
const contactRoutes = require('../controllers/contact-controller');

// connect to the database
const dataConnect = async () => {
    await connectDB();
};
dataConnect();

const app = express();

// setup product routes
app.use(contactRoutes);

app.get('/', (request, response) =>
    // const notes = fetchedData();
    // if (notes) {
    //     return response.status(400).json({ success: true, notes });
    // }
    response.json({ failure: true, notes: [] }),
);

// setup app environemnt
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
