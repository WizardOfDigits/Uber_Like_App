import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDb from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import driverRoutes from "./routes/driver.routes.js";

const app = express();
connectToDb();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRoutes);
app.use("/driver", driverRoutes);

export default app;
