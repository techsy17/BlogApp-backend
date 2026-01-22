// import express from 'express';
// import dotenv from 'dotenv'
// import connectDB from './config/db.js';
// import userRoute from './routes/userRoute.js';
// import blogRoute from './routes/blogRoute.js';
// import subcriptionRoute from './routes/subscriptionRoute.js';
// import paymentRoute from './routes/paymentRoute.js';
// import cors from 'cors';

// dotenv.config();
// await connectDB();

// const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );

// app.get('/api',(req,res)=>{
//   res.json({success: true,
//     message: "Backend Running.."
//   });
// });

// app.use(express.json())
// app.use('/api',userRoute);
// app.use('/api',blogRoute);
// app.use('/api',subcriptionRoute);
// app.use('/api',paymentRoute);


// // const PORT = 8000
// // app.listen(PORT,()=>{
// //     console.log(`Server running on port ${PORT}`);
// // });

// export default app;

// netlify/functions/api.mjs
import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "../../routes/userRoute.js";
import blogRoute from "../../routes/blogRoute.js";
import subscriptionRoute from "../../routes/subscriptionRoute.js";
import paymentRoute from "../../routes/paymentRoute.js";

const app = express();

// CORS
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// DB Connection (serverless-friendly)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI not set in Netlify env vars");
  const db = await mongoose.connect(process.env.MONGO_URI, {
    bufferCommands: false,
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
  });
  isConnected = db.connections[0].readyState;
  console.log("Database connected successfully!");
};

app.use(async (req, res, next) => {
  if (!isConnected) await connectDB();
  next();
});

// Routes
app.get("/api", (req, res) => {
  res.json({ success: true, message: "Backend Running.." });
});

app.use("/api", userRoute);
app.use("/api", blogRoute);
app.use("/api", subscriptionRoute);
app.use("/api", paymentRoute);

// Export handler
export const handler = serverless(app);
