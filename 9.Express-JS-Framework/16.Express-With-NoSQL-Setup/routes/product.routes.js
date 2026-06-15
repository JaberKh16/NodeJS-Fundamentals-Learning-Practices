const express = require('express');
const productController = require('../controllers/product.controller');


const router = express.Router();

router.get('/index', productController.handleProducts);
router.get('/:id', productController.handleSpecficProduct);
router.get('/create', productController.handleProductEntry);
router.put('/update/:id', productController.handleUpdateProduct);
router.delete('/delete/:id', productController.handleDeleteProduct);


module.exports = router;
