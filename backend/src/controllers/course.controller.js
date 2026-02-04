import { Course } from "../models/course.model.js"
import {uploadOnCloudinary} from '../config/cloudinary.js'
import { Lecture } from "../models/lecture.model.js"
import { User } from "../models/user.model.js"

const createCourse = async(req,res)=>{
try {
    const {title, category} = req.body 
    if(!title || !category){
      return res.status(400).json({message:"Title and category are required"})
    }

    const course=await Course.create({
      title,
      creator:req.userId,
      category
    })

    return res.status(201).json({course,message:"Course Created Successfully"}) 

} catch (error) {
    return res.status(500).json({  message:`createCourse error : ${error}`})
}
}

const getPublishedCourses=async(req,res)=>{
try {
    const courses= await Course.find({isPublished:true}).populate('lectures reviews')
    return res.status(200).json(courses)            //if courses not found then return []
} catch (error) {
    return res.status(500).json({message:`getPublishedCourses error :${error}`})
}                                                    
}

const getCreatorCourses = async(req,res)=>{
try {
    const userId = req.userId 
    const courses = await Course.find({creator:userId})
    if (courses.length === 0) {
    return res.status(404).json({message: "No courses found for this creator"});
}
    return res.status(200).json(courses)
} catch (error) {
    return res.status(500).json({message:`getCreatorCourses error :${error}`})
}
}

const editCourse = async(req,res)=>{
try {
    const {courseId}=req.params
    const {title, subTitle, description, category, level, isPublished, price } = req.body
    // console.log(courseId);
    
    const updateData = {title, subTitle, description, category, level, isPublished, price}

    if(req.file){
        updateData.thumbnail=await uploadOnCloudinary(req.file.path)
    }

    const course = await Course.findByIdAndUpdate(
        courseId,
        updateData,
        {new:true}
    )
    

    if(!course){
      return res.status(404).json({message:"Course not found"}) 
    }
    
    return res.status(200).json({course,message:"Update Course Successfully"})
} catch (error) {
    return res.status(500).json({message:`EditCourse error :${error}`})
}   
}

const getCourseById = async(req,res)=>{
try {
    const {courseId}=req.params
    const course=await Course.findById(courseId)
    if(!course){
      return res.status(404).json({message:"Course not found"})   
    }
     return res.status(200).json(course)
} catch (error) {
    return res.status(500).json({message:`getCourseById error :${error}`})
}    
}

const removeCourse=async(req,res)=>{
try {
    const {courseId}=req.params
    
    const course=await Course.findByIdAndDelete(courseId)

    if(!course){
      return res.status(404).json({message:"Course not found"})   
    }

    return res.status(200).json({message:"Course Delete Successfully"})

} catch (error) {
    return res.status(500).json({message:`removeCourse error :${error}`})
}    
}


//for Lectures

const createLecture = async(req,res)=>{
try {
    const {lectureTitle} = req.body
    const {courseId} = req.params
    if(!lectureTitle || !courseId){
        return res.status(400).json({message : "lectureTitle and courseId are required"})
    }

    const course = await Course.findById(courseId)

    if(!course){
        return res.status(404).json({message : "course is not found"})
    }
    
    const lecture = await Lecture.create({lectureTitle}) 
    
    course.lectures.push(lecture._id)
    await course.save()
    
    const populatedCourse = await Course.findById(courseId)
      .populate("lectures")

    return res.status(201).json({lecture, course : populatedCourse, message:"Lecture Added"})

} catch (error) {
    return res.status(500).json({message:`createLecture error :${error}`}) 
}
}

const getCourseLectures= async(req,res)=>{
try {
    const {courseId} = req.params
    const course = await Course.findById(courseId).populate("lectures")

    if(!course){
        return res.status(404).json({message : "Course not found"})
    }

    return res.status(200).json(course)
    
} catch (error) {
    return res.status(500).json({message:`getCourseLectures error :${error}`})
}
}                     

const editLecture = async(req,res)=>{
try {
    const {lectureId} = req.params
    const {lectureTitle, isPreviewFree} = req.body
    
    const lecture = await Lecture.findById(lectureId)

    if(!lecture){
        return res.status(404).json({message : "Lecture not found"})
    }

    const updateData={}

    if (lectureTitle) {
      updateData.lectureTitle = lectureTitle
    }
    
    // console.log(typeof(isPreviewFree));                          //string
    
    if (typeof(isPreviewFree) !== "undefined") {
      updateData.isPreviewFree = isPreviewFree === "true"
    }

    if(req.file){
        const uploadResult = await uploadOnCloudinary(req.file.path)
        updateData.videoUrl = uploadResult
    }

    const updatedLecture=await Lecture.findByIdAndUpdate(
        lectureId,
        updateData,
        {new:true}
    )

     return res.status(200).json({lecture : updatedLecture, message:"Lecture updated successfully"})

} catch (error) {
    return res.status(500).json({message:`editLecture error :${error}`})
}
}

const removeLecture = async(req,res)=>{
try {
    const {lectureId}=req.params
    const lecture = await Lecture.findByIdAndDelete(lectureId)

    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found"
      })
    }

    await Course.updateOne(                             //for update lectures in Course
        {lectures:lectureId},
        {$pull:{lectures:lectureId}}                    //remove the lecture from Course.lectures array
    )
    
    return res.status(200).json({message:"Lecture Delete Successfully"})
     
} catch (error) {
    return res.status(500).json({message:`removeLecture error :${error}`})
}
}

const getCreatorById = async(req,res)=>{    //get course creator data
try {
    const {creatorId} = req.body
    const creator = await User.findById(creatorId).select("-password") 

    if(!creator){
        return res.status(404).json({message:"Creator not found"})
    }

    return res.status(200).json(creator)
} catch (error) {
    return res.status(500).json({message:`getCretorById error :${error}`})
}    
}



export {
    createCourse,
    getPublishedCourses,
    getCreatorCourses,
    editCourse,
    getCourseById,
    removeCourse,
    createLecture,
    getCourseLectures,
    editLecture,
    removeLecture,
    getCreatorById
}








// <------------------------Notes--------------------------------->
// updateOne() is a MongoDB update method used to update only ONE document that matches the given filter.

// In simple words:
// MongoDB finds the first matching document and updates it.

// 🧠 Basic Syntax
// Model.updateOne(filter, update, options)

 //“$pull is a MongoDB update operator used to remove matching elements from an array field.”