const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // This should always be a URL pointing to a file not stored in the DB
  // Storing files in a DB would slow it down
  image: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  // ref conencts the current schema to the another schema
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

// Adds a collection of the "name" lowercase with an s
module.exports = mongoose.model("Place", placeSchema);
