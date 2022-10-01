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

  // Before saving into the database, _id is added in the end provided by mongoose
  // console.log(createdProduct);
  // Save does the heavy lifting for insert one and goes to the right db and collection
  // Path is given from Product model export
  const result = await createdProduct.save();
  // this is a virtual getter helped by mongoose _id is an object, id is a string
  //console.log(typeof creadedProduct.id);
  res.json(result);
};


const getProducts = async (req, res, next) => {
  // Easy way to grab with the model itself with mongoose
  // find() in mongoose defaults to sending back an array
  // if we need the cursor do .find().cursor
  // .exec() will change it to a promise
  const products = await Product.find().exec();

  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
