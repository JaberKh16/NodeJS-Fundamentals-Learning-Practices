const router = require('express').Router();
const productController = require('../controllers/product.controller');

router.post('/create', productController.createProduct);
router.get('/index', productController.listProducts);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;