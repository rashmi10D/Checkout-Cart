const productRoutes = require("./product/route");
const cartRoutes = require("./cart/route");
module.exports = (app) => {
  app.use("/product", productRoutes);
  app.use("/cart", cartRoutes);
};
