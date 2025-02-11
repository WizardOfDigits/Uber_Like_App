import axios from "axios";
import driverModel from "../models/driver.model.js";

// getAddressCoordinate
export const getAddressCoordinateService = async (address) => {
  const apiKey = process.env.MAPS_API;
  const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// getDistanceTime
export const getDistanceTimeService = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("origin and destination are required");
  }
  const apiKey = process.env.MAPS_API;
  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${encodeURIComponent(destination)}&origins=${encodeURIComponent(origin)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No routes found");
      }
      return response.data.rows[0].elements[0];
    } else {
      throw new Error("Uable to fetch distance and time");
    }
  } catch (error) {
    throw err;
  }
};

// getAutoCompleteSuggestions
export const getAutoCompleteSuggestionsService = async (input) => {
  if (!input) {
    throw new Error("Query is required");
  }
  const apiKey = process.env.MAPS_API;
  const url = `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions
        .map((prediction) => prediction.description)
        .filter((value) => value);
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// getDriversInRaidus
export const getDriversInRadiusService = async (ltd, lng, radius) => {
  // radius in km
  const drivers = await driverModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });
  return drivers;
};
