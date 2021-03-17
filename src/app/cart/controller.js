const service = require("./service");
const productRepository = require("../Product/repo");

/**
 * add item to cart
 * @param {add items to cart} req 
 * @param {*} res 
 */
exports.addItemToCart = (req, res) => {
  console.log(req.body);
  service.addItemToCart(req, (err, response) => {
    if (err) {
      console.log(err);
      res.status(400).json({ status: 400, error: err });
    } else {
      console.log(response);
      res.status(200).json({ status: 200, data: response });
    }
  });
};

/**
 * get cart items
 * @param {*} req 
 * @param {*} res 
 */
exports.getCart = (req, res) => {
  service.getCart(req, (err, response) => {
    if (err) {
      res.status(400).json({ status: 400, error: err });
    } else {
      console.log(response);
      res.status(200).json({ status: 200, data: response });
    }
  });
};

