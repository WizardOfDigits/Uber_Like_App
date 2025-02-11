import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import connectToDb from "./db/db.js";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import driverRoutes from "./routes/driver.routes.js";
import mapsRoutes from "./routes/maps.routes.js";
import ridesRoutes from "./routes/rides.routes.js";

const app = express();
connectToDb();

// middlware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/drivers", driverRoutes);
app.use("/api/v1/maps", mapsRoutes);
app.use("/api/v1/rides", ridesRoutes);

export default app;
