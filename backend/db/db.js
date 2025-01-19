import mongoose from "mongoose";

function connectToDb() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("🛢 Connected to the database successfully");
  } catch (error) {
    console.log("⚠️ Error connecting to the database:", error);
  }
}

export default connectToDb;
