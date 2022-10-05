const { v4: uuid } = require("uuid"); // V4 includes a timestamp
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "This Name",
    email: "text@test.com",
    password: "testers",
  },
];

const getUsers = async (req, res, next) => {
  let users;

  try {
    // Return email and name, but not password
    // projection to only return email and name
    //users = await User.find({}, 'email name');
    // but we'll do, to just exclude password
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later. " + err,
      500
    );
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password, places } = req.body;

  let existingUser;

  try {
    // findOne find's one that matches the criteria
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later. " + err,
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    // Later we'll add in encryption for the password later
    password,
    image:
      "https://media.istockphoto.com/photos/new-york-city-skyline-picture-id486334510?k=20&m=486334510&s=612x612&w=0&h=OsShL4aTYo7udJodSNXoU_3anIdIG57WyIGuwW2_tvA=",
    // currently a dummy
    places,
  });

  try {
    await createdUser.save(); // Mongoose handles the all the MongoDB code needed to store into DB also create Unique places Id
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  // getters removes _ in _id to make it easier to access
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    // findOne find's one that matches the criteria
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later. " + err,
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("User does not exist.", 422);
    return next(error);
  }

  // A dummy validation for now to check if email or password is wrong

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Invalid credentials could not log in.", 401);
    return next(error);
  }

  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
