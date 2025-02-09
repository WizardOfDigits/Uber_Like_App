import driverModel from "../models/driver.model.js";
import createDriver from "../services/driver.service.js";
import { validationResult } from "express-validator";
import blacklistTokenModel from "../models/blacklistToken.model.js";

// driver registration
export const registerDriver = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;
  const isDriverExists = await driverModel.findOne({ email });
  if (isDriverExists)
    return res.status(400).json({ msg: "Driver already exists" });

  const hashedPassword = await driverModel.hashPassword(password);
  const driver = await createDriver({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });
  const token = driver.generateAuthToken();
  res.status(201).json({ token, driver });
};

// login driver
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
  const isMatch = await driver.comparePassword(password);

  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
  const token = driver.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, driver });
};

// driver profile
export const getDriverProfile = async (req, res, next) => {
  res.status(200).json({ driver: req.driver });
};

// driver logout
export const logoutDriver = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.status(200).json({ msg: "Logout successful" });
};
