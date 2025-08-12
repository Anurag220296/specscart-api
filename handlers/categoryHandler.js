// Import the category controller which contains the core business logic
const categoryController = require('../controllers/categoryController');

/**
 * @desc    Create a new category
 * @route   POST /categories
 * @access  Protected (should be restricted to admins in real scenarios)
 */
exports.createCategory = (req, res) => {
    categoryController.createCategory(req, res);
};

/**
 * @desc    Get all categories
 * @route   GET /categories
 * @access  Public
 */
exports.getAllCategories = (req, res) => {
    categoryController.getAllCategories(req, res);
};

/**
 * @desc    Get a single category by its ID
 * @route   GET /categories/:id
 * @access  Public
 */
exports.getCategoryById = (req, res) => {
    categoryController.getCategoryById(req, res);
};

/**
 * @desc    Update a category by its ID
 * @route   PUT /categories/:id
 * @access  Protected
 */
exports.updateCategory = (req, res) => {
    categoryController.updateCategory(req, res);
};

/**
 * @desc    Delete a category by its ID
 * @route   DELETE /categories/:id
 * @access  Protected
 */
exports.deleteCategory = (req, res) => {
    categoryController.deleteCategory(req, res);
};
