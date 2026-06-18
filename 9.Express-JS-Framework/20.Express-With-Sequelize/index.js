const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const categoryRouter = require('./src/routes/category.routes');
const productRouter = require('./src/routes/product.routes');
const cors = require('cors');

// // setup dotenv
dotenv.config({ path: process.cwd() + '/.env' });
// // dotenv.config({ path: process.cwd() + "/.env", quiet:true }); // to run dotenve sliently with no logs


const app = express();


// setup app configuration
app.use(express.json());
app.use(cors());
// app.use(express.urlencode({ }));
app.use('/api/categories', categoryRouter); // prefix all category routes with /api/categories
app.use('/api/products', productRouter); // prefix all product routes with /api/products



sequelize.sync().then(() => {
  console.log(`Database connected and synchronized.`);
}); // sync all depend on models definition

app.listen(process.env.APP_PORT || 4000, () => {
  console.log(`server running at ${process.env.HOST_ADDR}:${process.env.APP_PORT}`);
});
