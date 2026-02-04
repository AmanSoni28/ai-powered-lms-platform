import getToken from "../config/token.js";
import { User } from "../models/user.model.js";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import sendOtpMail from "../config/sendMail.js";

const signUp= async (req,res)=>{
try {
    const {name,email,password,role}=req.body
    
    if([name,email,password,role].some((field) => field?.trim() === "")){                       
      return res.status(500).json({message:`All fields are required`}) 
   }

    if(!validator.isEmail(email)){          
        return res.status(400).json({message: "Invalid email address"})
    }

    if(password.length<8){
        return res.status(400).json({message: "Password must be at least 8 characters"})
    }
    
    const existingUser = await User.findOne({email})
    
    if(existingUser){
      return res.status(409).json({message:"User with this email already exists"})
    }

    const createdUser=await User.create({
        name,
        email,
        password,
        role
    })

    const user= await User.findById(createdUser._id).select("-password")

    const token = await getToken(user._id)

    const options={
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:7*24*60*60*1000
    }

    return res.
    status(201).
    cookie("token",token,options)
    .json({user, message:"User Signup Successfully"})

} catch (error) {
    return res.status(500).json({message:`SighUp error :${error}`})
}
}

const logIn = async(req,res)=>{
try {
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"})
    }

    const getUser = await User.findOne({email})

    if(!getUser){
        return res.status(400).json({message: "Email not found"})
    }

    const isPasswordCorrect =await bcrypt.compare(password,getUser.password)    

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect password"})
    }

    const user= await User.findById(getUser._id).select("-password")
    
    const token = await getToken(user._id)

    const options={
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:7*24*60*60*1000
    }

    return res.
    status(200).
    cookie("token",token,options)
    .json({user, message:"User LogIn Successfully"})

} catch (error) {
    return res.status(500).json({message:`LogIn error :${error}`})
}
}

const logOut = async(req,res)=>{
try {
    const options={
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:7*24*60*60*1000
    }
    return res.
    status(200)
    .clearCookie("token",options)
    .json({message:`LogOut Successfully`}) 
} catch (error) {
    return res.status(500).json({message:`LogOut error :${error}`})
}
}


const sendOtp= async(req,res)=>{
try {
    const {email}=req.body

    if (!email) {
     return res.status(400).json({ message: "Email is required" });
    }

    const user= await User.findOne({email})
    if(!user){
        return res.status(404).json({message:"User with this email does not exist"})
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();           //generate 4 digit otp and conver in string 

    user.resetOtp = otp;

    user.otpExpires = Date.now() + 10 * 60 * 1000;                           // Expires in 10 min, (current_time+10min)

    user.isOtpVerified = false;

    await user.save();                                 //save in database

    await sendOtpMail(email, otp);
   
    return res.status(200).json({ message: "OTP sent to email" });
} catch (error) {
    return res.status(500).json({ message: `send otp error :${error}` });
}
}

const verifyOtp = async(req,res)=>{
try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });

    if (!user || !user.resetOtp) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // OTP expired check
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

     // OTP match check
    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP verified → clear OTP
    user.isOtpVerified = true;
    user.resetOtp = null;
    user.otpExpires = null;

    await user.save();                      //save in database

    return res.status(200).json({
      message: "OTP verified successfully",
    });


} catch (error) {
    return res.status(500).json({ message: `verify OTP error: ${error}` });
}
}

const resetPassword = async(req,res)=>{
try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required" });
    }       

    if(newPassword.length<8){
        return res.status(400).json({message: "Password must be at least 8 characters"})
    }

    const user = await User.findOne({ email }); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.isOtpVerified) {
        return res.status(400).json({ message: "OTP not verified" });
    }

    user.password = newPassword;
    user.isOtpVerified = false;
    await user.save();                      //save in database

    return res.status(200).json({ message: "Password reset successfully" });
}
catch (error) { 
    return res.status(500).json({ message: `reset password error: ${error}` });
}
}



const googleAuth = async(req,res)=>{
try {
    const {name,email,role}=req.body
    if(!name || !email || !role){
        return res.status(400).json({message:"All fields are required"})
    }

    let user = await User.findOne({email})
        
    if(!user){
      user = await User.create({
      name,
      email,
      role
    })
    }

    const token = await getToken(user._id) 
        
    const options={
    httpOnly:true,
    secure:false,
    sameSite:"lax",
    maxAge:7*24*60*60*1000
    }

    return res.
    status(200).
    cookie("token",token,options)
    .json({user, message:"Google Authentication Successfully"})
        
  } catch (error) {
    return res.status(500).json({ message: `Google SignUp error: ${error}` });
  }
}

export {signUp,logIn,logOut,sendOtp,verifyOtp,resetPassword,googleAuth}