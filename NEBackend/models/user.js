const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  // unique creates an index to the email so it can retrieve it from the DB faster
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  // Adding [] around the object will tell mongoose it can have multiple values
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place'}]
});

// Error is very technical. So replace it when using user
userSchema.plugin(uniqueValidator);

// Adds a collection of the "User" lowercase with an s
module.exports = mongoose.model("User", userSchema);