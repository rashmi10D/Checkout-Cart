const promotionRepository = require("./repository");
exports.createPromotion = async (req ) => {
    
      let payload = {
        ruleId: req.ruleId,
        ruleDescription: req.ruleDescription,
        product: req.product,
        productName: req.product,
        discountType: req.discountType,
        isEnabled: req.isEnabled,
        discount: req.discount,
        date: req.date,
        quantity: req.quantity,
        price: req.price,

      };
    return await promotionRepository.createPromotion({ ...payload });
      
  };


  exports.getPromotionByProductId = async (productId, callback) => {
      promotionRepository.getPromotionByProductId(productId, (err, res)=>{

        callback(undefined, res);
      });
      
      
  };
