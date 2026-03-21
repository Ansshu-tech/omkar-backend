const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS FIX
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ✅ CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ Error:", err));

// ✅ SCHEMA
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  images: [String],
  details: [String]
});

const Product = mongoose.model(
  "Product",
  productSchema,
  "omkarabrasivesproducts"
);

// ✅ API ROUTE
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});
// ✅ ADD THIS HERE 👇
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});
// ✅ IMPORTANT: PORT FIX FOR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
