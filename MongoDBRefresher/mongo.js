const MongoClient = require("mongodb").MongoClient;

// Adding in a node between / and ?
const url = "mongodb+srv://sa:pQRoscg3ZShNNX6C@cluster0.xepeola.mongodb.net/?retryWrites=true&w=majority";

const createProduct = async (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    };

    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db("test");
        const result = db.collection("products").insertOne(newProduct);
    } catch (error) {
        return res.json({message: error});
    }

    client.close();

    res.json(newProduct);
};

const getProducts = async (req, res, next) => {

};

exports.createProduct = createProduct;
exports.getProducts = getProducts;