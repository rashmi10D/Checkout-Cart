const service = require("./service");
const productRepository = require("../Product/repo");
const cartService = require("./service")

/**
 * add item to cart
 * @param {add items to cart} req 
 * @param {*} res 
 */
exports.addItemToCart = (req, res) => {
  service.addItemToCart(req, (err, response) => {
    if (err) {
      console.log(err);
      res.status(400).json({ status: 400, error: err });
    } else {
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
      res.status(200).json({ status: 200, data: response });
    }
  });
};

/**
 * Checkout 
 * @param {*} req 
 * @param {*} res 
 */
exports.checkout = async (req, res) => {

  try {
     cartService.checkout((cart)=>{

      if (!cart) {
        return res.status(400).json({
          type: "Invalid",
          msg: "Cart not Found",
        });
      }
      res.status(200).json({
        status: true,
        data: cart,
      });
    });
   
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err: err,
    });
  }

}
