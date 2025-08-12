// Import Mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// Import crypto for generating secure random product keys
const crypto = require("crypto");

// Define the Product schema
const productSchema = new mongoose.Schema({
    // Unique product identifier (auto-generated if not provided)
    productKey: {
        type: String,
        unique: true,      // Must be unique across all products
        required: true     // Cannot be empty
    },
    // Name of the product
    name: {
        type: String,
        required: true,    // Mandatory field
        trim: true         // Removes extra spaces at the start/end
    },
    // Price of the product
    price: {
        type: Number,
        required: true,    // Mandatory field
        min: 0             // Price cannot be negative
    },
    // Product description
    description: {
        type: String,
        default: ''        // Default empty string
    },
    // Image URL for the product
    imageURL: {
        type: String,
        default: ''
    },
    // Category reference (foreign key to Category collection)
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',   // References the Category model
        required: true
    },
    // Brand name (default: Specscart)
    brand: {
        type: String,
        default: 'Specscart'
    },
    // Availability status
    inStock: {
        type: Boolean,
        default: true
    },
    // Flexible attributes (key-value pairs for additional product data)
    attributes: {
        type: Map,
        of: mongoose.Schema.Types.Mixed, // Can store any type of value
        default: {}
    },
    // Product creation date
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-validation hook to auto-generate productKey if not provided
productSchema.pre('validate', function (next) {
    if (!this.productKey) {
        // Format: PROD-XXXXXXXX (random hex in uppercase)
        this.productKey = 'PROD-' + crypto.randomBytes(4).toString('hex').toUpperCase();
    }
    next();
});

// Export the Product model
module.exports = mongoose.model('Product', productSchema);
