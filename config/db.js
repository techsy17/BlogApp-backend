import mongoose from "mongoose";

let isConnected = false; // cache connection

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined. Set it in Netlify environment variables.");
  }

  try {
    const db = await mongoose.connect(mongoUri, {
      bufferCommands: false,
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
    });

    isConnected = db.connections[0].readyState;
    console.log("Database connected Successfully..");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default connectDB;
