const mongoose = require('mongoose');
const crypto = require("crypto");

const productSchema = new mongoose.Schema({
    productKey: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        default: ''
    },
    imageURL: {
        type: String,
        default: ''
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    brand: {
        type: String,
        default: 'Specscart'
    },
    inStock: {
        type: Boolean,
        default: true
    },
    attributes: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

productSchema.pre('validate', function (next) {
    if (!this.productKey) {
        this.productKey = 'PROD-' + crypto.randomBytes(4).toString('hex').toUpperCase();
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);
