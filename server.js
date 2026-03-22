const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS
app.use(cors({ origin: "*" }));
app.use(express.json());

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

// ✅ ROUTES
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();

    console.log("Fetched products:", products); // 👈 DEBUG

    res.json(products);
  } catch (err) {
    console.error("ERROR:", err); // 👈 VERY IMPORTANT
    res.status(500).json({ error: err.message });
  }
});

// ✅ CONNECT + START SERVER ONLY AFTER DB CONNECTS
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
  });
