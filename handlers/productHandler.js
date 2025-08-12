const productController = require('../controllers/productController');

exports.createProduct = async (req, res) => {
    try {
        const product = await productController.createProduct(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// exports.getProducts = async (req, res) => {
//     try {
//         const products = await productController.getProducts();
//         res.json(products);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

exports.getProductById = async (req, res) => {
    try {
        const product = await productController.getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductByKey = async (req, res) => {
    try {
        const product = await productController.getProductByKey(req.params.productKey);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProductByKey = async (req, res) => {
    try {
        const product = await productController.updateProductByKey(req.params.productKey, req.body);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteProductByKey = async (req, res) => {
    try {
        const product = await productController.deleteProductByKey(req.params.productKey);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createBulkProducts = (req, res) => {
    productController.createBulkProducts(req, res);
};

exports.getProducts = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const data = await productController.getPaginatedProducts(page, limit);
    res.json(data);
  } catch (error) {
    console.error("Pagination Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getFilteredProducts = async (req, res) => {
  try {
    const data = await productController.getFilteredProducts(req.query);
    res.json(data);
  } catch (error) {
    console.error("Product API Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};