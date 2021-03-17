const cartRepository = require("./repo");
const productRepository = require("../product/repo");
const async = require("async");
const promotionReposiatry = require("../promotion/repository");

exports.getCart = async (req, callback) => {
  try {
    let cart = await cartRepository.cart();
    callback(undefined, cart);
  } catch (err) {
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

exports.checkout = async (callback) => {
  let cart = await cartRepository.cart();

  let checkoutItem = [];

  let totalCartItems = cart.items;
// console.log(totalCartItems, "totalCartItems");
  async.forEach(totalCartItems, (item, i) => {
    let productId = item.productId._id;
    checkoutItem.push(
      new Promise((resolve, reject) => {
        promotionReposiatry.getPromotionByProductId(
          productId,
          (errpro, promotion) => {
            let finalPriceCartItem = {};
            finalPriceCartItem.productId = item.productId._id;
            finalPriceCartItem.product = item.productId.name;
            finalPriceCartItem.subTotal = item.total;
            finalPriceCartItem.price = item.price;
            finalPriceCartItem.quantity = item.quantity;

            if (promotion && promotion.isEnabled) {
              finalPriceCartItem.total = findTotalPriceAfterDis(
                promotion,
                item
              );
            } else {
              finalPriceCartItem.total = item.total;
            }
            finalPriceCartItem.discount = item.total - finalPriceCartItem.total;
            if (promotion) {
              finalPriceCartItem.promotionId = promotion._id;
              finalPriceCartItem.ruleId = promotion.ruleId;
              finalPriceCartItem.discountType = promotion.discountType;
            } else {
              finalPriceCartItem.promotionId = null;
              finalPriceCartItem.ruleId = null;
              finalPriceCartItem.discountType = null;
            }
            resolve(finalPriceCartItem);
          }
        );
      })
    );
  });

  Promise.all(checkoutItem)
    .then((value) => {
      let checkout = {};
      let billTotal = 0;
      let totalDiscount = 0;
      let subTotal = 0;
      for (var index in value) {
        billTotal += value[index].total;
        totalDiscount += value[index].discount;
        subTotal += value[index].subTotal;
      }

      checkout.total = billTotal;
      checkout.subTotal = subTotal;
      checkout.discount = totalDiscount;
      checkout.items = value;
      promotionReposiatry.getPromotionByProductId("BASKET",(errpro, promotion) => {
            
          if (promotion && promotion.price < checkout.total) {
            checkout.total = checkout.total - promotion.discount;
          }

          callback(checkout);
        }
      );
    })
    .catch((er) => {});
};

function findTotalPriceAfterDis(promotion, cartItem) {
  let promotionType = promotion.discountType;
  let quantity = cartItem.quantity;
  let promoQuantity = promotion.quantity;
  let totalAfterDiscount = 0;
  if (promotionType == 1) {
    totalAfterDiscount = cartItem.total;

    if (promoQuantity <= quantity) {
      let reminder = quantity % promoQuantity;

      if (reminder == 0) {
        let discount = quantity * promotion.discount;

        totalAfterDiscount = cartItem.total - discount;
      }
    }
  } else if (promotionType == 2) {
    totalAfterDiscount = cartItem.total;

    if (promoQuantity <= quantity) {
      let reminder = quantity % promoQuantity;

      if (reminder == 0) {
        let discountItemCount = quantity / promoQuantity;
        let discount = discountItemCount * promotion.discount;
        totalAfterDiscount = cartItem.total - discount;
      }
    }
  }

  return totalAfterDiscount;
}
