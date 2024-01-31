const express = require('express');
const productRoutes = require('../routes/product-routes');

const app = express();

// setup product routes
app.use(productRoutes);

// setup app environemnt
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
