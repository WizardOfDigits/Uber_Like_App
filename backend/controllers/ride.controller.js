import { createRideService } from "../services/ride.service.js";
import { validationResult } from "express-validator";

export const createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;
  try {
    const ride = await createRideService({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    return res.status(201).json({ ride });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
