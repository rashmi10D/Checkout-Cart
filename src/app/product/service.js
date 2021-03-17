const productRepository = require("./repo");
exports.createproduct = async (req, callback) => {
  try {
    let payload = {
      name: req.body.name,
      price: req.body.price,
    };
    let product = await productRepository.createProduct({
      ...payload,
    });
    callback(undefined, product);
  } catch (err) {
    callback(err, undefined);
  }
};
exports.getProducts = async (req, callback) => {
  try {
    let products = await productRepository.products();
    callback(undefined, products);
  } catch (err) {
    console.log("in getProducts", err);
    callback(err, undefined);
  }
};
exports.getProductById = async (req, callback) => {
  try {
    let id = req.params.id;
    let product = await productRepository.productById(id);
    callback(undefined, product);
  } catch (err) {
    console.log("in getProductById", err);
    callback(err, undefined);
  }
};
