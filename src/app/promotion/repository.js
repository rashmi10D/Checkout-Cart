
const Promotion = require('./model');
exports.getPromotionByProductId = async (id, callback) => {
    Promotion.findOne({product: id}).exec((err, res)=>{

      if (err){
        callback(err, null);
      }else {
        callback(null, res);
      }
    })
    
  };
  exports.createPromotion = async (payload) => {
    const newPromotion = await Promotion.create(payload);
    return newPromotion;
  };