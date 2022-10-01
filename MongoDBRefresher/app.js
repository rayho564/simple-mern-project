const express = require('express');
const bodyParser = require('body-parser');

const mongooosePractice = require("./mongoose");
const mongoPractice = require("./mongo");

const app = express();

app.use(bodyParser.json());

app.post('/products', mongooosePractice.createProduct);

app.get('/products', mongoPractice.getProducts);

app.listen(3000);