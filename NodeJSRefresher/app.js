const express = require("express");

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

app.use((req, res, next) => {
  let body = "";

  // Calling next on when it's done parsing the data
  req.on("end", () => {
    const userName = body.split("=")[1];
    if (userName) {
      req.body = { name: userName };
    }
    next();
  });

  // listen on data changes
  req.on("data", (chunk) => {
    body += chunk;
  });
});

app.use((req, res, next) => {
  if (req.body) {
    return res.send('<h1>' + req.body.name + '</h1>');
  }

  res.send(
    '<form method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>'
  );
});

app.listen(5000);
