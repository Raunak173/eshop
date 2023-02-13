const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

require("dotenv/config");

const PORT = process.env.PORT;
const api = process.env.API;
const MONGO_URI = process.env.MONGO_URI;

app.get(`/${api}/products`, (req, res) => {
  const products = [
    {
      id: "1",
      name: "Iphone 11",
      price: "47000 Rs",
    },
    {
      id: "2",
      name: "Iphone 12",
      price: "55000 Rs",
    },
    {
      id: "3",
      name: "Iphone 13",
      price: "63000 Rs",
    },
  ];
  res.send(products);
});

app.post(`/${api}/products`, (req, res) => {
  const newProduct = req.body;
  res.send(newProduct);
});

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
