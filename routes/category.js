// Import the Express framework
const express = require('express');

// Create a new router instance for handling category-related routes
const router = express.Router();

// Import the category handler which contains logic for each route
const categoryHandler = require('../handlers/categoryHandler');

/**
 * @route   POST /
 * @desc    Create a new category
 * @access  Protected (should be restricted to admins in real scenarios)
 */
router.post('/', categoryHandler.createCategory);

/**
 * @route   GET /
 * @desc    Get all categories
 * @access  Public
 */
router.get('/', categoryHandler.getAllCategories);

/**
 * @route   GET /:id
 * @desc    Get a single category by its ID
 * @access  Public
 */
router.get('/:id', categoryHandler.getCategoryById);

/**
 * @route   PUT /:id
 * @desc    Update a category by its ID
 * @access  Protected
 */
router.put('/:id', categoryHandler.updateCategory);

/**
 * @route   DELETE /:id
 * @desc    Delete a category by its ID
 * @access  Protected
 */
router.delete('/:id', categoryHandler.deleteCategory);

// Export the router so it can be used in the main application
module.exports = router;
