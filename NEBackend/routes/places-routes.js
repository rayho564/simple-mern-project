const express = require("express");

const HttpError = require("../models/http-error");

// Gives a special object that has more middleware and can be exported
const router = express.Router();

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

router.get("/:pid", (req, res, next) => {
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
});

// order of the routes matter cause of the url handling if was not more specific with /user/:uid
//  if it was /user then :pid will override this first
router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    // This is an example since both above and this middleware is synchronous then you can throw
    throw new Error("Could not find a place for the provided user id.", 404);
  }

  res.json({ place }); // => {place} => {place: place};
});

module.exports = router;
