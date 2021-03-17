const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({
    message: "shopping cart up !!",
  });
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Application is running on ${port}`);
});
require("./config/mongoose.js")(app);
require("./app/routes")(app);

module.exports.app = app;
