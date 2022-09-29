const express = require("express");

const placesControllers = require('../controllers/places-controllers');

// Gives a special object that has more middleware and can be exported
const router = express.Router();

router.get("/:pid", placesControllers.getPlacesById);

// order of the routes matter cause of the url handling if was not more specific with /user/:uid
//  if it was /user then :pid will override this first
router.get("/user/:uid", placesControllers.getPlacesByUserId);

// URLs will only trigger gets, so the path we don't have to worry about conflicting above
router.post("", placesControllers.createPlace);

router.patch("/:pid", placesControllers.updatePlaceById);

router.delete("/:pid", placesControllers.deletePlaceById);

module.exports = router;
