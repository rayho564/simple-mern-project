const axios = require("axios");
const HttpError = require("../models/http-error");
const privatekeys = require("../privatekeys");

async function getCoordsForAddress(address) {
  const API_KEY = privatekeys.API_KEY;
  //   return {
  //     lat: 40.7484474,
  //     lng: -73.9871516,
  //   };

  const response = await axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${API_KEY}`
    )
    .then();

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
} // const getCoordsForAddress = () => {...}

module.exports = getCoordsForAddress;