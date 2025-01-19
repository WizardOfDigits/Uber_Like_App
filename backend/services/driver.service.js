import driverModel from "../models/driver.model.js";

export const createDriver = async ({
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !firstName ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  const driver = driverModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });
  return driver;
};
