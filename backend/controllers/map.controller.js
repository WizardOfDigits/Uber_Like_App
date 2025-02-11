import {
  getAddressCoordinateService,
  getDistanceTimeService,
  getAutoCompleteSuggestionsService,
} from "../services/maps.service.js";
import { validationResult } from "express-validator";

// getCoordinates
export const getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { address } = req.query;
  try {
    const coordinates = await getAddressCoordinateService(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(400).json({ message: "Coordinates not found" });
  }
};

// getDistanceTime
export const getDistanceTime = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { origin, destination } = req.query;
  try {
    const distanceTime = await getDistanceTimeService(origin, destination);
    res.status(200).json(distanceTime);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// getAutoCompleteSuggestions
export const getAutoCompleteSuggestions = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { input } = req.query;
  try {
    const susggestion = await getAutoCompleteSuggestionsService(input);
    res.status(200).json(susggestion);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
