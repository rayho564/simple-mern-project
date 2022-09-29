const { v4: uuid } = require('uuid'); // V4 includes a timestamp

const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St., New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St., New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: "u2",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // params grabs from the url { pid: 'p1' } if url/p1
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    // This must be used in async code. Do not throw in async code
    return next(
      new HttpError("Could not find a place for the provided id.", 404)
    );
  }

  res.json({ place }); // => {place} => {place: place};
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    // This is an example since both above and this middleware is synchronous then you can throw
    throw new Error("Could not find a place for the provided user id.", 404);
  }

  res.json({ place }); // => {place} => {place: place};
};

// alternatives you get do
// function getPlaceById() {...}
// const getPlaceByID = function () {...}

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  //This is temp until we do mongoDB
  const createdPlace = {
    id: uuid(),
    title,
    description, 
    location: coordinates, 
    address, 
    creator
  };

  DUMMY_PLACES.push(createPlace); //unshift(createdPlace) to add to the front

  // 200 is normal succcess
  // 201 is new success
  res.status(201).json({place: createdPlace});
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;