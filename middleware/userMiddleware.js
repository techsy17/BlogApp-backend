import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authorized = async (req,res,next) =>{

    const token = req.headers["authorization"];
    // console.log(token);

    try {
        
        let jwtToken = token.split(' ')[1];
        const verifyToken = jwt.verify(jwtToken,process.env.SECRET_KEY);
        if(!verifyToken){
            return res.status(400).json({message: "Invalid or Expired JWT Token",success: false});
        }
        
        const userId = verifyToken.userId;
        // console.log(userId);

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not Found..",success: false})
        }
        // res.status(200).json({message: "You are authorized" , user});
        req.user = user;
        next();
        
    } catch (error) {
        res.status(500).json(error.message);
        // res.status(500).json({message: "JWT Token is Expired"})
    }
}


export {authorized};