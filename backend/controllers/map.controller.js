import {
  getAddressCoordinate,
  getAddressDistanceTime,
  getAutoCompleteSuggestions as fetchSuggestions,
} from "../services/map.service.js";
import { validationResult } from "express-validator";

export const getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { address } = req.query;
  try {
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: "Coordinates not found" });
  }
};

export const getDistanceTime = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    const distanceTime = await getAddressDistanceTime(origin, destination);

    res.status(200).json(distanceTime);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAutoCompleteSuggestions = async (req, res, next) => {
  try {
    // Validate input query parameters
    if (!req.query || !req.query.input) {
      return res
        .status(400)
        .json({ message: "The 'input' query parameter is required." });
    }

    const { input } = req.query;

    // Call the service function to fetch suggestions
    const suggestions = await fetchSuggestions(input);

    // Respond with the suggestions
    res.status(200).json(suggestions);
  } catch (err) {
    console.error("Error in getAutoCompleteSuggestions:", err);

    // Handle specific service errors
    if (err.message === "query is required") {
      return res
        .status(400)
        .json({ message: "The 'input' query parameter is required." });
    }

    // Respond with a generic server error
    res.status(500).json({ message: "Internal server error" });
  }
};
