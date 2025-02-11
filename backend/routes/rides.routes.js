import express from "express";
import { body, query } from "express-validator";
import {
  createRide,
  getFare,
  confirmRide,
  startRide,
  endRide,
} from "../controllers/ride.controller.js";
import { authUser, authDriver } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/create",
  authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "motorcycle"])
    .withMessage("Invalid vehicle type"),
  createRide,
);

router.get(
  "/get-fare",
  authUser,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  getFare,
);

router.post(
  "/confirm",
  authDriver,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  confirmRide,
);

router.get(
  "/start-ride",
  authDriver,
  query("rideId").isMongoId().withMessage("Invalid ride id"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),
  startRide,
);

router.post(
  "/end-ride",
  authDriver,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  endRide,
);

export default router;
