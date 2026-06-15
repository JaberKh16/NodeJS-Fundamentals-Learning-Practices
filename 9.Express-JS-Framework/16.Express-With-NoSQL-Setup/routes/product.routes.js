const express = require('express');


const router = express.Router();

router.get('/index', handleProducts);
router.get('/:id', handleSpecficProduct);
router.get('/create', handleProductEntry);
router.update('/update/:id', handleUpdateProduct);
router.delete('/delete/:id', handleDeleteProduct);


module.exports = router;
