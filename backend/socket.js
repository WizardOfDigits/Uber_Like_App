import { Server } from "socket.io";
import userModel from "./models/user.model.js";
import driverModel from "./models/driver.model.js";

let io;

export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`User  ${userId}, joined as ${userType}`);

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "driver") {
        await driverModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("update-location-driver", async (data) => {
      const { userId, location } = data;
      if (!location?.ltd || !location?.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }
      await driverModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

export const sendMessageToSocketId = (socketId, messageObject) => {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};
