const express = require('express');
const router = express.Router();
const categoryHandler = require('../handlers/categoryHandler');

// Category routes
router.post('/', categoryHandler.createCategory);
router.get('/', categoryHandler.getAllCategories);
router.get('/:id', categoryHandler.getCategoryById);
router.put('/:id', categoryHandler.updateCategory);
router.delete('/:id', categoryHandler.deleteCategory);

module.exports = router;
