const Product = require('../models/product');
const Category = require('../models/category');

exports.createProduct = async (data) => {
    const { category } = data;
    const catExists = await Category.findById(category);
    if (!catExists) throw new Error('Invalid category ID');

    const product = new Product(data);
    return await product.save();
};

exports.getProducts = async () => {
    return await Product.find().populate('category');
};

exports.getProductById = async (id) => {
    return await Product.findById(id).populate('category');
};

exports.getProductByKey = async (productKey) => {
    return await Product.findOne({ productKey }).populate('category');
};

exports.updateProductByKey = async (productKey, data) => {
    if (data.category) {
        const catExists = await Category.findById(data.category);
        if (!catExists) throw new Error('Invalid category ID');
    }
    return await Product.findOneAndUpdate({ productKey }, data, { new: true });
};

exports.deleteProductByKey = async (productKey) => {
    return await Product.findOneAndDelete({ productKey });
};


exports.createBulkProducts = async (req, res) => {
    try {
        let products = req.body.products;
        console.log("Bulk products data:", products);
        
        if (!Array.isArray(products) || products.length === 0) {
            throw new Error("Products data must be a non-empty array");
        }

        const validProducts = [];

        for (let product of products) {
            if (!product.category) continue;

            const categoryDoc = await Category.findOne({ name: product.category.trim() });

            if (!categoryDoc) {
                console.warn(`Category not found for product: ${product.name}`);
                continue; 
            }

            product.category = categoryDoc._id;

            validProducts.push(product);
        }

        if (validProducts.length === 0) {
            return res.status(400).json({ error: "No valid products to insert" });
        }

        const savedProducts = await Product.insertMany(validProducts);
        res.status(201).json(savedProducts);

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};