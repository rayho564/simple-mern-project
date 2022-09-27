// when running npm start
// everything gets parsed through require and brings in the exports into the const

// Also the get, use, and posts also gets parsed
// The middleware  function calls don't get executed right away, but stored as references
// Express will then run those references when those post, get, use requests meet the criteria

const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.post('/user', (req, res, next) => {
  return res.send('<h1>' + req.body.username + '</h1>');
});

app.get('/', (req, res, next) => {
  res.send(
    '<form action="/user" method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>'
  );
});

app.listen(5000);
