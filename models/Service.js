const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // instead of title
    description: { type: String, required: true },
    basePrice: { type: Number, required: true }, // instead of price
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
