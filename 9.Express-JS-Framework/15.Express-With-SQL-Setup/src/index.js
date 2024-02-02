// const productRoutes = require('../routes/product-routes');
import express from 'express';
import fetchedData from '../database-setup/db-config';

const app = express();

// setup product routes
// app.use(productRoutes);

app.get('/', (request, response) => {
    const notes = fetchedData();
    if (notes) {
        return response.status(400).json({ success: true, notes });
    }
    return response.json({ failure: true, notes: [] });
});

// setup app environemnt
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
