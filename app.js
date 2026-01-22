import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import userRoute from './routes/userRoute.js';
import blogRoute from './routes/blogRoute.js';
import subcriptionRoute from './routes/subscriptionRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get('/',(req,res)=>{
  res.json({success: true,
    message: "Backend Running.."
  });
});

app.use(express.json())
app.use('/api',userRoute);
app.use('/api',blogRoute);
app.use('/api',subcriptionRoute);
app.use('/api',paymentRoute);


// const PORT = 8000
// app.listen(PORT,()=>{
//     console.log(`Server running on port ${PORT}`);
// });

export default app;