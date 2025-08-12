// Import Mongoose library for MongoDB connection
const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Establish connection to MongoDB using Mongoose
    await mongoose.connect(
      "mongodb+srv://anuragkmsisodia:D5WPEmQfOQCRhw15@cluster0.a0opw4j.mongodb.net/",
      {
        useNewUrlParser: true,    // Ensures proper URL string parsing
        useUnifiedTopology: true  // Uses the new MongoDB driver connection engine
      }
    );

    // Log success message if connected
    console.log("✅ MongoDB Connected");
  } catch (err) {
    // Log error if connection fails
    console.error("❌ MongoDB Connection Error:", err);

    // Exit process with failure code
    process.exit(1);
  }
};

// Export the connection function
module.exports = connectDB;
