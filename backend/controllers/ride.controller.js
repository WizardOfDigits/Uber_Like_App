import { createRideService, getFareService } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import {
  getDriversInRadius,
  getAddressCoordinate,
} from "../services/map.service.js";
import rideModel from "../models/ride.model.js";
import { sendMessageToSocketId } from "../socket.js";

export const createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, pickup, destination, vehicleType } = req.body;
  try {
    const ride = await createRideService(
      req.user._id,
      pickup,
      destination,
      vehicleType,
    );

    res.status(201).json({ ride });

    const pickupCoordinates = await getAddressCoordinate(pickup);
    console.log(pickupCoordinates);
    const driversInRadius = await getDriversInRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      2,
    );

    const ridewithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");
    driversInRadius.map((driver) => {
      sendMessageToSocketId(driver.socketId, {
        event: `new-ride`,
        data: ridewithUser,
      });
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;

  try {
    const fare = await getFareService(pickup, destination);
    return res.status(200).json(fare);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
