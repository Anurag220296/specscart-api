const express = require('express');
const mongoose = require('mongoose');

const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const connectDB = require("./config/db");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

connectDB();

// Use routes
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
