// Import Mongoose models
const Product = require('../models/product');
const Category = require('../models/category');

/**
 * @desc    Create a new product (validates category before creation)
 * @param   {Object} data - Product data from request body
 * @returns {Object} Saved product document
 */
exports.createProduct = async (data) => {
    const { category } = data;
    // Ensure category exists
    const catExists = await Category.findById(category);
    if (!catExists) throw new Error('Invalid category ID');

    const product = new Product(data);
    return await product.save();
};

/**
 * @desc    Get all products with category details
 * @returns {Array} List of products
 */
exports.getProducts = async () => {
    return await Product.find().populate('category');
};

/**
 * @desc    Get a single product by its database ID
 * @param   {String} id - Product MongoDB ID
 * @returns {Object|null} Product document or null if not found
 */
exports.getProductById = async (id) => {
    return await Product.findById(id).populate('category');
};

/**
 * @desc    Get a product by its unique product key
 * @param   {String} productKey - Unique product key
 * @returns {Object|null} Product document or null if not found
 */
exports.getProductByKey = async (productKey) => {
    return await Product.findOne({ productKey }).populate('category');
};

/**
 * @desc    Update a product using its unique product key
 * @param   {String} productKey - Unique product key
 * @param   {Object} data - Updated product data
 * @returns {Object|null} Updated product document or null if not found
 */
exports.updateProductByKey = async (productKey, data) => {
    // Validate category if provided in update
    if (data.category) {
        const catExists = await Category.findById(data.category);
        if (!catExists) throw new Error('Invalid category ID');
    }
    return await Product.findOneAndUpdate({ productKey }, data, { new: true });
};

/**
 * @desc    Delete a product using its unique product key
 * @param   {String} productKey - Unique product key
 * @returns {Object|null} Deleted product document or null if not found
 */
exports.deleteProductByKey = async (productKey) => {
    return await Product.findOneAndDelete({ productKey });
};

/**
 * @desc    Bulk create products from an array in the request body
 * @route   POST /products/bulk
 * @access  Protected
 */
exports.createBulkProducts = async (req, res) => {
    try {
        let products = req.body.products;
        console.log("Bulk products data:", products);
        
        // Validate incoming data format
        if (!Array.isArray(products) || products.length === 0) {
            throw new Error("Products data must be a non-empty array");
        }

        const validProducts = [];

        // Validate each product's category and prepare for insertion
        for (let product of products) {
            if (!product.category) continue;

            // Find category by name (case-insensitive trimming spaces)
            const categoryDoc = await Category.findOne({ name: product.category.trim() });

            if (!categoryDoc) {
                console.warn(`Category not found for product: ${product.name}`);
                continue; 
            }

            // Replace category name with category _id
            product.category = categoryDoc._id;

            validProducts.push(product);
        }

        if (validProducts.length === 0) {
            return res.status(400).json({ error: "No valid products to insert" });
        }

        // Insert all valid products
        const savedProducts = await Product.insertMany(validProducts);
        res.status(201).json(savedProducts);

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

/**
 * @desc    Get paginated list of products
 * @param   {Number} page - Current page number
 * @param   {Number} limit - Number of products per page
 * @returns {Object} Pagination result with products
 */
exports.getPaginatedProducts = async (page, limit) => {
  // Convert to numbers & set defaults
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const skip = (page - 1) * limit;

  // Fetch paginated products
  const products = await Product.find().skip(skip).limit(limit);

  // Total count for pagination
  const totalProducts = await Product.countDocuments();

  return {
    totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page,
    products,
  };
};

/**
 * @desc    Get filtered & paginated products based on query params
 * @param   {Object} query - Filters and pagination options
 * @returns {Object} Pagination result with filtered products
 */
exports.getFilteredProducts = async (query) => {
  let { search, category, brand, price_min, price_max, sort, page, limit } = query;

  // Pagination defaults
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 8;
  const skip = (page - 1) * limit;

  // Build MongoDB filter object
  const filter = {};

  // Search by name or description (case-insensitive)
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
  }

  // Filter by category (comma-separated IDs)
  if (category) {
      const categoryNames = category.split(",").map(name => name.trim());
      const categoryDocs = await Category.find({
        name: { $in: categoryNames }
      }).select("_id");

      const categoryIds = categoryDocs.map(cat => cat._id);

      if (categoryIds.length) {
        filter.category = { $in: categoryIds };
      } 
    }

  // Filter by brand (comma-separated names)
  if (brand) {
    filter.brand = { $in: brand.split(",") };
  }

  // Filter by price range
  if (price_min || price_max) {
    filter.price = {};
    if (price_min) filter.price.$gte = Number(price_min);
    if (price_max) filter.price.$lte = Number(price_max);
  }

  // Sorting
  let sortObj = {};
  if (sort) {
    const [field, order] = sort.split("_");
    sortObj[field] = order === "asc" ? 1 : -1;
  }

  // Query DB and populate category details
  const products = await Product.find(filter)
    .populate("category", "name description")
    .sort(sortObj)
    .skip(skip)
    .limit(limit);

  const totalProducts = await Product.countDocuments(filter);

  return {
    totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page,
    products
  };
};
