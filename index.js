const express = require('express');
const mongoose = require('mongoose');

const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb+srv://anuragkmsisodia:D5WPEmQfOQCRhw15@cluster0.a0opw4j.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Use routes
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
