const express = require('express');
const router = express.Router();
const productHandler = require('../handlers/productHandler');

router.post('/', productHandler.createProduct);
router.get('/', productHandler.getProducts);
router.get('/products', productHandler.getFilteredProducts);
router.get('/:id', productHandler.getProductById);
router.get('/key/:productKey', productHandler.getProductByKey);
router.put('/key/:productKey', productHandler.updateProductByKey);
router.delete('/key/:productKey', productHandler.deleteProductByKey);
router.post('/bulk', productHandler.createBulkProducts);

module.exports = router;
