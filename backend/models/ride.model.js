import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "driver",
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "ACCEPTED", "ONGOING", "COMPLETED", "CANCELLED"],
    default: "PENDING",
  },
  duration: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
});

const rideModel = mongoose.model("ride", rideSchema);
export default rideModel;
