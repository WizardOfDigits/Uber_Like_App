import express from "express";
import { body } from "express-validator";
import {
  loginDriver,
  registerDriver,
  getDriverProfile,
  logoutDriver,
} from "../controllers/driver.controller.js";
import { authDriver } from "../middlewares/auth.middleware.js";

const router = express.Router();
// Register driver
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 character long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color  must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcylcle"])
      .withMessage("Invalid vehicle type"),
  ],
  registerDriver,
);

// Login driver
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginDriver,
);

// Get driver
router.get("/profile", authDriver, getDriverProfile);

// Logout driver
router.post("/logout", authDriver, logoutDriver);
export default router;
