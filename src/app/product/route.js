const router = require("express").Router();
const productController = require("./controller");
router.post(
  "/",
  productController.createProduct
);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.removeProduct);
module.exports = router;
