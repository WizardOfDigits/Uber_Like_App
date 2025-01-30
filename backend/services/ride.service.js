import rideModel from "../models/ride.model.js";
import { getAddressDistanceTime } from "./map.service.js";

export async function getFareService(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await getAddressDistanceTime(pickup, destination);

  const baseFare = {
    car: 50,
    motorcycle: 20,
    bullcart: 5,
  };

  const perKmRate = {
    car: 15,
    motorcycle: 10,
    bullcart: 5,
  };

  const perMinuteRate = {
    car: 3,
    motorcycle: 2,
    bullcart: 0.5,
  };

  const fare = {
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car,
    ),
    motorcycle: Math.round(
      baseFare.motorcycle +
        (distanceTime.distance.value / 1000) * perKmRate.motorcycle +
        (distanceTime.duration.value / 60) * perMinuteRate.motorcycle,
    ),
    bullcart: Math.round(
      baseFare.motorcycle +
        (distanceTime.distance.value / 1000) * perKmRate.bullcart +
        (distanceTime.duration.value / 60) * perMinuteRate.bullcart,
    ),
  };

  return fare;
}

export async function createRideService(
  user,
  pickup,
  destination,
  vehicleType,
) {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All field are required ");
  }
  const fare = await getFareService(pickup, destination);
  const ride = rideModel.create({
    user,
    pickup,
    destination,
    vehicleType,
    fare: fare[vehicleType],
  });
  return ride;
}
