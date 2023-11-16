const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    imagen: { type: String, required: true, trim: true },
    contenido: { type: String, required: true },
    titulo: { type: String, required: true, trim: true },
    usuario: { type: String, required: true },
    quality: { type: String, required: true },
    Categoria: { type: String, required: true },
    perfil: {
      type: String,
      default:
        "https://cmsalbacete.com/wp-content/uploads/2018/05/if_unknown_403017.png",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
