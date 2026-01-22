import mongoose from "mongoose";

const connectDB = async () =>{
    try {

       await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected Successfully..");

    } catch (error) {
        console.log(error.message);
        
    }
}

export default connectDB;

