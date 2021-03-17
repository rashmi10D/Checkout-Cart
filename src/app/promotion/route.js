const router = require("express").Router();
const promotionController = require("./controller");
router.post("/",promotionController.createPromotion);

router.get("/product/:id", promotionController.getPromotionByProductId);
module.exports = router;