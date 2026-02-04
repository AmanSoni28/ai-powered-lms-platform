import { Course } from "../models/course.model.js"
import { Review } from "../models/review.model.js"

const createReview = async(req,res)=>{
try {
    const {rating, comment, courseId}=req.body
    const userId=req.userId

    if (!rating || !courseId) {
      return res.status(400).json({ message: "Rating and courseId are required" })
    }
    
    const course=await Course.findById(courseId)
    if(!course){
        return res.status(404).json({message:"Course not found"})
    }
    const alreadyReviewed=await Review.findOne({
        course:courseId,
        user:userId
    })

    if(alreadyReviewed){
        return res.status(400).json({message:"You have already reviewed this course"})
    }

    const review= new Review({
        course:courseId,
        user:userId,
        rating,
        comment
    })

    await review.save()

    course.reviews.push(review._id)
    await course.save()

     const populatedReview = await Review.findById(review._id)
      .populate("user course")

    return res.status(201).json({review:populatedReview,message:"Review Added Successfully"})
} catch (error) {
    return res.status(500).json({message:`review error:${error}`})
}
}

const getReviews=async(req,res)=>{
try {
    const reviews = await Review.find({})
      .populate("user course")                             //populate only (name, photoUrl and role) from user 
      .sort({ reviewedAt: -1 })          // latest first

    return res.status(200).json(reviews)
    
} catch (error) {
    return res.status(500).json({message:`getReviews error:${error}`})
}
}

export {createReview,getReviews}