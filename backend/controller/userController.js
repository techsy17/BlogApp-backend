import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req,res) =>{
    const {username,email,password} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message : "User already register with these Email!",success: false});
    }

    try {
        const hashPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({username,email,password : hashPassword});
        if(newUser) {
            res.status(201).json({message : "User Registered Successfully",newUser,success: true});
        }
    } catch (error) {
        res.status(500).json({message: "User not Registered , Some thing went wrong..",success: false});
    }
};


const login = async (req,res) =>{
    const {email,password} = req.body;
    // const user_Id = User._id;
    // console.log(userId);
    
    const user = await User.findOne({email});
    
    if (!user) {
        return res.status(400).json({message: "Email or Password is Incorrect",success: false});
    }

    const matchPass = await bcrypt.compare(password,user.password);
    if(!matchPass){
        return res.status(400).json({message: "Password do not match",success: false});
    }

    try {

        const token = jwt.sign({userId: user._id},process.env.SECRET_KEY,{expiresIn: '5d'});
        // console.log(user._id);
        res.status(200).json({message: "User Login Successfully",user,token,success: true});
    } catch (error) {
        res.status(500).json({message: "JWT Token not Generated",error:error.message,success: false});
    }
};


const home = async (req,res)=>{
    res.status(200).json({message: "Protected Route only access by Authorized Person",success: true})
};

export {register,login,home};