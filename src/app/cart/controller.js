const service = require("./service");
const productRepository = require("../Product/repo");
const cartService = require("./service")
const cartRepository = require('./repo')

/**
 * add item to cart
 * @param {add items to cart} req 
 * @param {*} res 
 */
exports.addItemToCart = (req, res) => {
  service.addItemToCart(req, (err, response) => {
    if (err) {
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
 * Empty Cart
 * @param {*} req 
 * @param {*} res 
 */
exports.emptyCart = async (req, res) => {
  try {
    let cart = await cartRepository.cart();
    cart.items = [];
    cart.subTotal = 0;
    let data = await cart.save();
    res.status(200).json({
      type: "success",
      mgs: "Cart has been emptied",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err: err,
    });
  }
};
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
