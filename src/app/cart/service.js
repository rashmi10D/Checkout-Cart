const cartRepository = require("./repo");
const productRepository = require("../product/repo");

exports.getCart = async (req, callback) => {
  try {
    let cart = await cartRepository.cart();
    console.log("in getCart", cart);
    callback(undefined, cart);
  } catch (err) {
    console.log("in getProducts", err);
    callback(err, undefined);
  }
};

exports.addItemToCart = async (req, callback) => {

  const { productId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  try {
    let cart = await cartRepository.cart();
    let productDetails = await productRepository.productById(productId);
    if (!productDetails) {
      callback(err, undefined);
    }
    if (!quantity) {
      callback(err, undefined);
    }
    if (cart) {
      const indexFound = cart.items.findIndex(
        (item) => item.productId.id == productId
      );
      if (indexFound !== -1 && quantity <= 0) {
        cart.items.splice(indexFound, 1);
        if (cart.items.length == 0) {
          cart.subTotal = 0;
        } else {
          cart.subTotal = cart.items
            .map((item) => item.total)
            .reduce((acc, next) => acc + next);
        }
      } else if (indexFound !== -1) {
        cart.items[indexFound].quantity =
          cart.items[indexFound].quantity + quantity;
        cart.items[indexFound].total =
          cart.items[indexFound].quantity * productDetails.price;
        cart.items[indexFound].price = productDetails.price;
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      } else if (quantity > 0) {
        cart.items.push({
          productId: productId,
          quantity: quantity,
          price: productDetails.price,
          total: parseInt(productDetails.price * quantity),
        });
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      } else {
        return res.status(400).json({
          type: "Invalid",
          msg: "Invalid request",
        });
      }
      let data = await cart.save();
      callback(undefined, cart);

    } else {
      const cartData = {
        items: [
          {
            productId: productId,
            quantity: quantity,
            total: parseInt(productDetails.price * quantity),
            price: productDetails.price,
          },
        ],
        subTotal: parseInt(productDetails.price * quantity),
      };
      cart = await cartRepository.addItem(cartData);
    }
    callback(undefined, cart);
  } catch (err) {
    callback(err, undefined);
  }
};
