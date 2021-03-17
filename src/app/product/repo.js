const Product = require("./model");
exports.products = async () => {
  const products = await Product.find();
  return products;
};
exports.productById = async (id) => {
  console.log(id);
  const product = await Product.findById(id);
  return product;
};
exports.createProduct = async (payload) => {
  const newProduct = await Product.create(payload);
  return newProduct;
};
