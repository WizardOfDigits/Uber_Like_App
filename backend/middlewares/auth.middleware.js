import userModel from "../models/user.model.js";
import driverModel from "../models/driver.model.js";
import jwt from "jsonwebtoken";
import blacklistToken from "../models/blacklistToken.model.js";

// user auth
export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isBlacklisted = await blacklistToken.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
// driver auth
export const authDriver = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isBlacklisted = await blacklistToken.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const driver = await driverModel.findById(decoded._id);
    if (!driver) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.driver = driver;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
