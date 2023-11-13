const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    descripcion: { type: String, required: false, trim: true },
    quality: { type: Number, enum: [1, 2, 3, 4, 5] },
    quality: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
