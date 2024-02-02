const express = require('express');
const { body, validationResult } = require('express-validator');

const productRoutes = express.Router();

productRoutes.get('/products', (request, response, next) => {});
