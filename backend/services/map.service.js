import axios from "axios";
import driverModel from "../models/driver.model.js";

export async function getAddressCoordinate(address) {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    throw error;
  }
}

export async function getAddressDistanceTime(origin, destination) {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;

  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${encodeURIComponent(destination)}&origins=${encodeURIComponent(origin)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No routes found");
      }

      return response.data.rows[0].elements[0];
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (err) {
    throw err;
  }
}

export async function getAutoCompleteSuggestions(input) {
  if (!input) {
    throw new Error("query is required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions
        .map((prediction) => prediction.description)
        .filter(Boolean);
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (err) {
    throw err;
  }
}
export async function getDriversInRadius(lat, lng, radius) {
  // radius in km

  const drivers = await driverModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], raidus / 3963.2],
      },
    },
  });
  return drivers;
}
