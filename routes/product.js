// Import the Express framework
const express = require('express');

// Create a new router instance to define product-related routes
const router = express.Router();

// Import the product handler which contains the logic for each route
const productHandler = require('../handlers/productHandler');

/**
 * @route   POST /
 * @desc    Create a new product
 * @access  Public/Protected (depending on middleware in main app)
 */
router.post('/', productHandler.createProduct);

/**
 * @route   GET /
 * @desc    Get all products with optional pagination and sorting
 * @access  Public
 */
router.get('/', productHandler.getProducts);

/**
 * @route   GET /products
 * @desc    Get products based on filters (e.g., category, price range)
 * @access  Public
 */
router.get('/products', productHandler.getFilteredProducts);

/**
 * @route   GET /:id
 * @desc    Get a single product by its database ID
 * @access  Public
 */
router.get('/:id', productHandler.getProductById);

/**
 * @route   GET /key/:productKey
 * @desc    Get a product by its unique product key
 * @access  Public
 */
router.get('/key/:productKey', productHandler.getProductByKey);

/**
 * @route   PUT /key/:productKey
 * @desc    Update product details using its unique product key
 * @access  Protected
 */
router.put('/key/:productKey', productHandler.updateProductByKey);

/**
 * @route   DELETE /key/:productKey
 * @desc    Delete a product using its unique product key
 * @access  Protected
 */
router.delete('/key/:productKey', productHandler.deleteProductByKey);

/**
 * @route   POST /bulk
 * @desc    Create multiple products in a single request
 * @access  Protected
 */
router.post('/bulk', productHandler.createBulkProducts);

// Export the router so it can be used in other parts of the app
module.exports = router;
