import express from "express";
import { body, query } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";
import { createRide, getFare } from "../controllers/ride.controller.js";

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
    .isIn(["car", "motorcycle", "bullcart"])
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
export default router;
