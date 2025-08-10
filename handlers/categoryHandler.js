const categoryController = require('../controllers/categoryController');

exports.createCategory = (req, res) => {
    categoryController.createCategory(req, res);
};

exports.getAllCategories = (req, res) => {
    categoryController.getAllCategories(req, res);
};

exports.getCategoryById = (req, res) => {
    categoryController.getCategoryById(req, res);
};

exports.updateCategory = (req, res) => {
    categoryController.updateCategory(req, res);
};

exports.deleteCategory = (req, res) => {
    categoryController.deleteCategory(req, res);
};
