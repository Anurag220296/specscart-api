// Import required packages
const express = require('express');
const mongoose = require('mongoose');

// Import route files
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

// Import database connection function
const connectDB = require("./config/db");

// Initialize the Express app
const app = express();
const PORT = 3000; // Server port

// ======================
// Middleware
// ======================

// Parse incoming JSON requests
app.use(express.json());

// ======================
// Database Connection
// ======================

connectDB(); // Connect to MongoDB

// ======================
// API Routes
// ======================

// Category-related routes
app.use('/categories', categoryRoutes);

// Product-related routes
app.use('/products', productRoutes);

// ======================
// Start the Server
// ======================

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
