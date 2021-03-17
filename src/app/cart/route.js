const router = require("express").Router();
const cartController = require("./controller");
router.post("/", cartController.addItemToCart);
router.get("/", cartController.getCart);
router.get('/checkout', cartController.checkout);
module.exports = router;
