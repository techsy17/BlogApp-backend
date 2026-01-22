// import mongoose from "mongoose";

// const connectDB = async () =>{
//     try {

//        await mongoose.connect(process.env.MONGODB_URL);
//         console.log("Database connected Successfully..");

//     } catch (error) {
//         console.log(error.message);
        
//     }
// }

// export default connectDB;

import mongoose from "mongoose";

let isConnected = false; // track connection across invocations

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,         // avoid waiting for DB if not connected
      connectTimeoutMS: 10000,       // timeout in 10 seconds
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
