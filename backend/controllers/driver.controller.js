import driverModel from "../models/driver.model.js";
import blacklistToken from "../models/blacklistToken.model.js";
import { createDriver } from "../services/driver.service.js";
import { validationResult } from "express-validator";

// Register driver
export const registerDriver = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password, vehicle } = req.body;
  const isDriverAlreadyRegister = await driverModel.findOne({ email });
  if (isDriverAlreadyRegister) {
    return res.status(400).json({ message: "Driver already exists" });
  }
  const hashedPassword = await driverModel.hashPassword(password);

  const driver = await createDriver({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = driver.generateAuthToken();
  res.status(201).json({ driver, token });
};

// Login driver
export const loginDriver = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const driver = await driverModel.findOne({ email }).select("+password");
  if (!driver) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isValid = await driver.comparePassword(password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = driver.generateAuthToken();
  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ driver, token });
};

// Get Profile
export const getDriverProfile = async (req, res, next) => {
  const driver = req.driver;
  res.status(200).json({ driver });
};

// Logout Driver
export const logoutDriver = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklistToken.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};
