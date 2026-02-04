import { uploadOnCloudinary } from "../config/cloudinary.js"
import { User } from "../models/user.model.js"

const getCurrentUser = async (req,res)=>{
try {
    const userId=req.userId

    const user=await User.findById(userId).select("-password").populate("enrolledCourses") 
    
    if(!user){
        return res.status(404).json({message:"User Not Found"})
    }

    return res.status(200).json(user)
} catch (error) {
    res.status(500).json({message: `getCurrent User Error ${error}`})
}
}

const updateProfile = async(req,res)=>{
try {
    const userId=req.userId
    const {name,description}=req.body

    const updateData = {
      name,
      description
    };

    if(req.file){
        updateData.photoUrl=await uploadOnCloudinary(req.file.path)
    }

    const user = await User.findByIdAndUpdate(
        userId,
        updateData,
        {new:true}
    ).select("-password")

    if(!user){
        return res.status(404).json({message:"User Not Found"})
    }

    return res.status(200).json({user,message:"Profile Updated Successfully"})
} catch (error) {
    res.status(500).json({message: `update Profile Error ${error}`})
}   
}

export {getCurrentUser, updateProfile}