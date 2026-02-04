import Razorpay from 'razorpay'
import dotenv from 'dotenv'
import { Course } from '../models/course.model.js'
import { User } from '../models/user.model.js'
dotenv.config({ path: './.env' })

const razorpayInstance  = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const createRazorpayOrder  = async(req,res)=>{
try {
    const {courseId}=req.body
    const course=await Course.findById(courseId)
    if(!course){
        return res.status(404).json({message:"Course not found"})
    }     
    const options={
        amount:course.price*100,              //amount in paisa
        currency:'INR',
        receipt:courseId.toString()
    }        
    
    const order= await razorpayInstance.orders.create(options)
    return res.status(200).json(order)
} catch (error) {
    return res.status(500).json({message:`createRazorpayOrder error :${error}`})
}
}

const verifyPayment = async (req,res)=>{
try {
    const {courseId, userId, razorpay_order_id} = req.body
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    // console.log(orderInfo);
    
    if(orderInfo.status === 'paid'){
        const user =await User.findById(userId)
        if(!user.enrolledCourses.includes(courseId)){
            await user.enrolledCourses.push(courseId)
            await user.save()
        }
        const course =await Course.findById(courseId).populate("lectures")
        if(!course.enrolledStudents.includes(userId)){
            await course.enrolledStudents.push(userId)
            await course.save()
        }
        return res.status(200).json({message:"payment verified and enrollment successful"})        
    }else{
        return res.status(400).json({message:"payment failed"})
    }

} catch (error) {
    return res.status(500).json({message:`Internal payment server error during payment verification :${error}`})
}    
}

export {createRazorpayOrder,verifyPayment}