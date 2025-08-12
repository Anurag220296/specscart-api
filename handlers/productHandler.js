// Import the product controller which contains the core business logic
const productController = require('../controllers/productController');

/**
 * @desc    Create a new product
 * @route   POST /products
 * @access  Protected (should be restricted to admins in real scenarios)
 */
exports.createProduct = async (req, res) => {
    try {
        // Call controller to create a product using request body data
        const product = await productController.createProduct(req.body);
        res.status(201).json(product); // Respond with created product
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * @desc    Get all products with pagination
 * @route   GET /products
 * @access  Public
 */
exports.getProducts = async (req, res) => {
    try {
        const { page, limit } = req.query; // Extract pagination params
        const data = await productController.getPaginatedProducts(page, limit);
        res.json(data);
    } catch (error) {
        console.error("Pagination Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

/**
 * @desc    Get filtered products based on query parameters
 * @route   GET /products/filter
 * @access  Public
 */
exports.getFilteredProducts = async (req, res) => {
    try {
        const data = await productController.getFilteredProducts(req.query);
        res.json(data);
    } catch (error) {
        console.error("Product API Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

/**
 * @desc    Get a product by its database ID
 * @route   GET /products/:id
 * @access  Public
 */
exports.getProductById = async (req, res) => {
    try {
        const product = await productController.getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @desc    Get a product by its unique product key
 * @route   GET /products/key/:productKey
 * @access  Public
 */
exports.getProductByKey = async (req, res) => {
    try {
        const product = await productController.getProductByKey(req.params.productKey);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @desc    Update a product using its unique product key
 * @route   PUT /products/key/:productKey
 * @access  Protected
 */
exports.updateProductByKey = async (req, res) => {
    try {
        const product = await productController.updateProductByKey(req.params.productKey, req.body);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * @desc    Delete a product using its unique product key
 * @route   DELETE /products/key/:productKey
 * @access  Protected
 */
exports.deleteProductByKey = async (req, res) => {
    try {
        const product = await productController.deleteProductByKey(req.params.productKey);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @desc    Create multiple products in a single request
 * @route   POST /products/bulk
 * @access  Protected
 */
exports.createBulkProducts = (req, res) => {
    // Directly pass req and res to controller for handling
    productController.createBulkProducts(req, res);
};
