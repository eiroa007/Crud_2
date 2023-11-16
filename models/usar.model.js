const mongoose = require("mongoose");

const UsarSchema = new mongoose.Schema(
  {
    Check1: { type: String, required: true, trim: true },
    Check2: { type: String, required: false },
    data: { type: String, required: true },
    perfil: { type: String, required: true, trim: true },
    usar: [{ type: mongoose.Types.ObjectId, ref: "usar" }],
    publicado: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Usar = mongoose.model("usar", UsarSchema);

module.exports = Usar;
