const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  ruleId: {
    type: String,
    required: [true, "Please include the rule id"],
  },
  ruleDescription: {
    type: String,
    required: [true, "Please include the rule description"],
  },
  date: {
    type: String,
    required: [true, "Please include the rule date"]
  },
  product: {
    type: String,
    required: [true, "Please include the product"],
  },

  productName: {
    type: String,
    required: [true, "Please include the product name"],
  },

  discount: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number
  },

  discountType: {
    type: Number,
    enum: [1, 2, 3],
    required: [true, "Please include the discount type"],
  },
  isEnabled: {
    type: Boolean,
    default: false,
  },
});
module.exports =
  mongoose.models.Promotion || mongoose.model("Promotion", ProductSchema);
