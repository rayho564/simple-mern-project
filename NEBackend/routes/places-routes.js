const express = require("express");
const { check } = require("express-validator"); // this works the same as const router = express.Router(); combined above

const placesControllers = require("../controllers/places-controllers");

// Gives a special object that has more middleware and can be exported
const router = express.Router();

router.get("/:pid", placesControllers.getPlacesById);

// order of the routes matter cause of the url handling if was not more specific with /user/:uid
//  if it was /user then :pid will override this first
router.get("/user/:uid", placesControllers.getPlacesByUserId);

// URLs will only trigger gets, so the path we don't have to worry about conflicting above
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);

router.patch(
  "/:pid",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 })
  ],
  placesControllers.updatePlaceById
);

router.delete("/:pid", placesControllers.deletePlaceById);

module.exports = router;
