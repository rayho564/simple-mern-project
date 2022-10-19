const fs = require('fs');
const path = require('path');

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

// static return a file with no execution
// path.join => only files in these folders
app.use('/uploads/images', express.static(path.join(`uploads`, 'images')));

app.use((req, res, next) => {
  // where should the browser allows this, * opens to all domains
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use("/api/places", placesRoutes); // => /api/places... then placeRoutes adds /
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

// With 4 params is a middleware call for errors
app.use((error, req, res, next) => {
  // multer adds in this
  // check if file exists, then we delete on error
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({
    message: error.message || "An unknown error occured!",
  });
});

// We're going to default the db to mern which is inbetween the / and ?
mongoose
  .connect(
    ""
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(error);
  });
