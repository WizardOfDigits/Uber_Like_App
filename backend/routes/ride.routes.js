import express from "express";
import { body } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";
import { createRide } from "../controllers/ride.controller.js";

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

export default router;
