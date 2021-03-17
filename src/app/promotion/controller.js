const promotionService = require('./service')
exports.createPromotion = async (req, res) => {
  try {
    
    let promotion = await promotionService.createPromotion(req.body);
    res.status(200).json({
      status: true,
      data: promotion,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};

exports.getPromotionByProductId = async (req, res) => {
    let id = req.params.id;
     promotionService.getPromotionByProductId(id, (err, promotionDetails)=>{

      if (err){

        res.status(500).json({
          status: false,
          error: err,
        });
      }else {
        res.status(200).json({
          status: true,
          data: promotionDetails,
        });
      }
    });
    
  
};