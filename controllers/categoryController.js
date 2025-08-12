// Import the Category model
const Category = require('../models/category');

/**
 * @desc    Create a new category
 * @route   POST /categories
 * @access  Protected (should be restricted to admins in real scenarios)
 */
exports.createCategory = async (req, res) => {
    try {
        // Create new category document from request body
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * @desc    Get all categories
 * @route   GET /categories
 * @access  Public
 */
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @desc    Get a single category by its ID
 * @route   GET /categories/:id
 * @access  Public
 */
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @desc    Update a category by its ID
 * @route   PUT /categories/:id
 * @access  Protected
 */
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return updated document
        );
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * @desc    Delete a category by its ID
 * @route   DELETE /categories/:id
 * @access  Protected
 */
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
