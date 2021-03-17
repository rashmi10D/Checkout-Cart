const productRoutes = require("./product/route");
const cartRoutes = require("./cart/route");
const promotionRoutes = require("./promotion/route");
module.exports = (app) => {
  app.use("/product", productRoutes);
  app.use("/cart", cartRoutes);
  app.use("/promotion", promotionRoutes);
};
