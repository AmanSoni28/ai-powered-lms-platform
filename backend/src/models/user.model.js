import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String                   
    },
    role:{
        type:String,
        enum:["student","educator"],
        required:true
    },
    photoUrl:{
        type:String,
        default:""
    },
    enrolledCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    resetOtp:{
        type:String
    },
    otpExpires:{
        type:Date
    },
    isOtpVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

userSchema.pre("save", async function(next){            
  if(!this.isModified("password")) return ;     
  this.password = await bcrypt.hash(this.password,10)              
})

export const User = mongoose.model("User",userSchema)