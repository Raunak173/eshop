const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv/config");

const app = express();

app.use(cors());
app.options("*", cors());

const PORT = process.env.PORT;
const api = process.env.API;
const MONGO_URI = process.env.MONGO_URI;

//Middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

//Routes
const productsRoutes = require("./routers/products");

app.use(`/${api}/products`, productsRoutes);

mongoose
  .connect(`${MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop",
  })
  .then(() => {
    console.log("DB connection is ready");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
