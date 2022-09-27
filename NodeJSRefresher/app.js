const express = require("express");
const bodyParser = require('body-parser');

// No need to create server cause it is handled with express
const app = express();

// Middleware
//  Core philosophy every incoming requests
//  will go through middleware functions to manipulate data/requests
//  next() to skip middleware to next middleware
// app.use((req, res, next) => {
//   console.log('MIDDLEWARE');
//   next(); // Will go to the next use which is a middleware
// });

// app.use((req, res, next) => {
//   let body = "";

//   // Calling next on when it's done parsing the data
//   req.on("end", () => {
//     const userName = body.split("=")[1];
//     if (userName) {
//       req.body = { name: userName };
//     }
//     next();
//   });

//   // listen on data changes
//   req.on("data", (chunk) => {
//     body += chunk;
//   });
// });

// With the use of bodyParser
app.use(bodyParser.urlencoded({extended: false}));

// triggers only when the http request is post
// path from action of form submit
app.post('/user', (req, res, next) => {
  return res.send('<h1>' + req.body.username + '</h1>');
});

// triggers only when get
// first param is path
app.get('/', (req, res, next) => {
  res.send(
    '<form action="/user" method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>'
  );
});

app.listen(5000);
