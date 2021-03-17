const service = require("./service");

/**
 * Create Product
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.createProduct = (req, res) => {
  service.createproduct(req, (err, response) => {
    if (err) {
      res.status(400).json({ status: 400, error: err });
    } else {
      res.status(200).json({ status: 200, data: response });
    }
  });
};
/**
 * get all Products
 * @param {*} req 
 * @param {*} res 
 */
exports.getProducts = (req, res) => {
  service.getProducts(req, (err, response) => {
    if (err) {
      res.status(400).json({ status: 400, error: err });
    } else {
      res.status(200).json({ status: 200, data: response });
    }
  });
};

/**
 *  get product by id
 * @param {get product by id} req 
 * @param {*} res 
 */
exports.getProductById = (req, res) => {
  service.getProductById(req, (err, response) => {
    if (err) {
      res.status(400).json({ status: 400, error: err });
    } else {
      res.status(200).json({ status: 200, data: response });
    }
  });
};

