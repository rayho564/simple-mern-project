const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose
  .connect(
    "mongodb+srv://sa2:passwordpass@cluster0.xvwejqs.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  // Save does the heavy lifting for insert one and goes to the right db and collection
  // Path is given from Product model export
  const result = await createdProduct.save();

  res.json(result);
};

exports.createProduct = createProduct;
