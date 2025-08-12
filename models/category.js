// Import Mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// Define the Category schema
const categorySchema = new mongoose.Schema({
    // Category name (must be unique)
    name: {
        type: String,
        required: true,   // Mandatory field
        unique: true      // No duplicate category names allowed
    },
    // Optional description for the category
    description: {
        type: String,
        default: ''       // Defaults to an empty string if not provided
    },
    // Timestamp when the category was created
    createdAt: {
        type: Date,
        default: Date.now // Automatically set to current date/time
    }
});

// Export the Category model
module.exports = mongoose.model('Category', categorySchema);
