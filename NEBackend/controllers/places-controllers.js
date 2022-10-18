const fs = require('fs');

//const { v4: uuid } = require("uuid"); // V4 includes a timestamp. Commented out as mongoose provides this
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");
const user = require("../models/user");

// let DUMMY_PLACES = [
//   {
//     id: "p1",
//     title: "Empire State Building",
//     description: "One of the most famous sky scrapers in the world!",
//     location: {
//       lat: 40.7484474,
//       lng: -73.9871516,
//     },
//     address: "20 W 34th St, New York, NY 10001",
//     creator: "u1",
//   },
// ];

const getPlacesById = async (req, res, next) => {
  const placeId = req.params.pid; // params grabs from the url { pid: 'p1' } if url/p1

  // findbyId doesn't return a promise, but with exec it would
  let places;
  try {
    places = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place",
      500
    );
    return next(error);
  }

  if (!places || places.length === 0) {
    // This is an example since both above and this middleware is synchronous then you can throw
    const error = new HttpError(
      "Could not find a places for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ places: places.toObject({ getters: true }) }); // => { places } => { places: places}
};

// function getPlaceById() { ... }
// const getPlaceById = function() { ... }

// const getPlacesByUserId = async (req, res, next) => {
//   const userId = req.params.uid;

//   // findbyId doesn't return a promise, but with exec it would
//   let places;
//   try {
//     // MongoDB returns a cursor, mongoose returns an array so we need to add .cursor
//     places = await Place.find({ creator: userId });
//   } catch (err) {
//     const error = new HttpError(
//       "Something went wrong, could not find a place",
//       500
//     );
//     return next(error);
//   }

//   if (!places || places.length === 0) {
//     const error = new HttpError(
//       "Could not find a places for the provided user id.",
//       404
//     );
//     return next(error);
//   }

//   res.json({
//     places: places.map((place) => place.toObject({ getters: true })),
//   }); // => { places } => { places: places}
// };

// Alternative with advantage of populate
const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(userId).populate('places');
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place",
      500
    );
    return next(error);
  }

  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    const error = new HttpError(
      "Could not find a places for the provided user id.",
      404
    );
    return next(error);
  }

  res.json({
    places: userWithPlaces.places.map((place) => place.toObject({ getters: true })),
  }); // => { places } => { places: places}
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  //This is temp until we do mongoDB
  // const title = req.body.title;
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: req.file.path,
    creator
  });

  //DUMMY_PLACES.push(createdPlace); //unshift(createdPlace) to add to the front

  let user;

  try {
    // check if the id of the logged in user exists to store it to the place
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      "Could not find user for the provided id.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find user for the provided id.",
      404
    );
    return next(error);
  }

  console.log(user);

  try {
    // await createdPlace.save(); // Mongoose handles the all the MongoDB code needed to store into DB also create Unique places Id
  
    // Transactions allows to perform multiple operations in isolation
    // Transactions are built in sessiosn
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({session: sess});
    // this is a mongoose push
    // mongodb grabs the created place id then adds it to the place field of the user
    user.places.push(createdPlace);
    await user.save({session: sess});
    // Only at this point everything will save.
    // If anything fails, mongoose rolls back everything
    // Needs an existing collection or this will fail, so manually add it in the db
    await sess.commitTransaction();

  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  // 201 is created new success
  res.status(201).json({ place: createdPlace });
};

const updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return (new HttpError("Invalid inputs passed, please check your data.", 422));
  }

  const placeId = req.params.pid;
  const { title, description } = req.body;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place",
      500
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place",
      500
    );
    return next(error);
  }

  // 200 is normal succcess
  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    // populate allows t o refer to a document stored in another collection and allows us to work with it
    // requires a relation, which we have User <-> Place connected with creator id
    place = await Place.findById(placeId).populate('creator');
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      "Could not find place for the provided id",
      404
    );
    return next(error);
  }

  const imagePath = place.image;

  try {

    const sess = await mongoose.startSession();
    sess.startTransaction();

    await place.remove({session: sess});
    // pull removes
    // place was populated with creator
    // place refs to creators which has places object and we're removing place
    place.creator.places.pull(place);
    await place.creator.save({session: sess});
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place",
      500
    );
    return next(error);
  }

  fs.unlink(imagePath, err => {
    console.log(err);
  });

  // 200 is normal succcess
  res.status(200).json({ message: "Deleted place." });
};

// alternatives you get do
// function getPlaceById() {...}
// const getPlaceByID = function () {...}

exports.getPlacesById = getPlacesById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
