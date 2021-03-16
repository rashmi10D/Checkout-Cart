const mongoose = require("mongoose");

var schema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    ruleId: {
      type: String,
      required: true,
    },
    ruleDescription: {
      type: String,
      required: true,
    },
    discount_percentage: {
      type: String,
      required: false,
    },
    discount_type: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    isEnabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.models["Promotion"] || mongoose.model("Promotion", schema);
