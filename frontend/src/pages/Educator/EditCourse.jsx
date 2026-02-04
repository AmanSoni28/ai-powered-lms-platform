import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6"
import { useState } from 'react'
import { useRef } from 'react'
import { FaEdit } from "react-icons/fa";
import axios from 'axios'
import {serverUrl} from '../../main.jsx'
import { useEffect } from 'react'
import emptyCourse from '/LMS_emptyCourse.png'
import { toast } from 'react-toastify'
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from 'react-redux'
import { setCreatorCoursesData } from '../../redux/courseSlice.js'
import { setPublishedCoursesData } from '../../redux/courseSlice.js'

const EditCourse = () => {
  const [isPublished,setIsPublished]=useState(false)
  const [title,setTitle]=useState("")
  const [subTitle,setSubTitle]=useState("")
  const [description,setDescription]=useState("")
  const [category,setCategory]=useState("")
  const [level,setLevel]=useState("")
  const [price,setPrice]=useState("")
  const [frontEndImage,setFrontEndImage]=useState(null)
  const [backEndImage,setBackEndImage]=useState(null)
  const navigate=useNavigate()
  const thumb=useRef()
  const {courseId} = useParams()
  // console.log(courseId);
  const [selectedCourse,setSelectedCourse]=useState(null)
  const [loading,setLoading]=useState(false)
  const [loadingDel,setLoadingDel]=useState(false)
  const {creatorCoursesData}=useSelector((state)=>state.course)
  const dispatch=useDispatch()
  const {publishedCoursesData} = useSelector((state)=>state.course)


  const handleThumbnail = (e)=>{
     const file = e.target.files[0]
     setBackEndImage(file)
     setFrontEndImage(URL.createObjectURL(file))
  }
  
  // getCourseById
  const getCourseById=async()=>{
  try {
    const result =await axios.get(`${serverUrl}/api/course/course/${courseId}`, {withCredentials:true})
    // console.log(result.data);
    setSelectedCourse(result.data)
  } catch (error) {
    console.log(error?.response?.data?.message || "getCourseById error");
  }
  }
  
  useEffect(()=>{
    getCourseById();
  },[])

  useEffect(()=>{
    // console.log(selectedCourse);
  setTitle(selectedCourse?.title || "")
  setSubTitle(selectedCourse?.subTitle || "")
  setDescription(selectedCourse?.description || "")
  setCategory(selectedCourse?.category || "")
  setLevel(selectedCourse?.level || "")
  setPrice(selectedCourse?.price || "")
  setFrontEndImage(selectedCourse?.thumbnail || emptyCourse)
  setIsPublished(selectedCourse?.isPublished || false)
  },[selectedCourse])

  // Edit Course
  const handleEditCourse = async (e)=>{
    setLoading(true)
    const formData = new FormData()
    formData.append("title",title)
    formData.append("subTitle",subTitle)
    formData.append("description",description)
    formData.append("category",category)
    formData.append("level",level)
    formData.append("price",price)
    formData.append("thumbnail",backEndImage)
    formData.append("isPublished",isPublished)

   try {
      const result = await  axios.patch(`${serverUrl}/api/course/edit-course/${courseId}`, formData, {withCredentials:true})
      const data=result.data
      // console.log(data);
      
      //update creatorCoursesData field
      const updatedCreatorCourses = creatorCoursesData?.map((course) =>course._id === courseId ? data.course : course)
      dispatch(setCreatorCoursesData(updatedCreatorCourses))

      //update publishedCoursesData field
      if (data.course.isPublished) {
       const exists = publishedCoursesData?.some(course => course._id === courseId)
       const updatedPublishedCourses = exists ? publishedCoursesData.map(course =>course._id === courseId ? data.course : course)
       : [...publishedCoursesData, data.course]

       dispatch(setPublishedCoursesData(updatedPublishedCourses))
     } else {
      const updatedPublishedCourses = publishedCoursesData?.filter( course => course._id !== courseId) || []
      dispatch(setPublishedCoursesData(updatedPublishedCourses))
     }

      setLoading(false)
      toast.success(data?.message)
      navigate('/courses')
   } catch (error) {
      toast.error(error?.response?.data?.message || "Edit Course Error");
      setLoading(false)
   }
  }
  
  // Remove Course
  const handleRemoveCourse=async()=>{
    setLoadingDel(true)
  try {
    const result = await  axios.delete(`${serverUrl}/api/course/remove-course/${courseId}`, {withCredentials:true})
    // console.log(result);
    
    //update creatorCoursesData field
    const updatedCreatorCourses = creatorCoursesData?.filter((course) => course._id !== courseId)
    dispatch(setCreatorCoursesData(updatedCreatorCourses))

    //update publishedCoursesData field
    const updatedPublishedCourses = publishedCoursesData?.filter((course) => course._id !== courseId)
    dispatch(setPublishedCoursesData(updatedPublishedCourses))

    setLoadingDel(false)
    toast.success(result?.data?.message)
    navigate('/courses')
  } catch (error) {
    toast.error(error?.response?.data?.message || "Remove Course Error");
    setLoadingDel(false)
  }
  }

  return (
    <div className='max-w-5xl mx-auto p-6 mt-10 bg-gray-100 rounded-lg shadow-md'>
     {/* top bar */}
      <div className='flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative'>
        <FaArrowLeft className='absolute top-[-20%] md:top-[20%] left-[0%] md:left-[2%] w-[20px] h-[20px] cursor-pointer' onClick={()=>navigate('/courses')}/>

        <h2 className='text-2xl font-semibold md:pl-[60px]'>Add Detail Information regarding the Course</h2>

        <div className='space-x-2 space-y-2'>
          <button 
          className='bg-black text-white px-4 py-2 rounded-md cursor-pointer'
          onClick={() => navigate(`/createlecture/${courseId}`)}
          >GO to Lecture page</button>
        </div>

      </div>
     {/* form data  */}
      <div className='bg-gray-50 p-6 rounded-md'>
        <h2 className='text-lg font-medium mb-4'>Basic Course Information</h2>
        <div className='space-x-2 space-y-2'> 
          {isPublished ? <button className='bg-red-100 text-red-600 px-4 py-2 rounded-md border-1 font-semibold  cursor-pointer' onClick={()=>setIsPublished((prev)=>!prev)}>Click to Unpublish</button> : <button className='bg-green-100 text-green-600 px-4 py-2 rounded-md border-1 font-semibold  cursor-pointer' onClick={()=>setIsPublished((prev)=>!prev)}>Click to Publish</button>}
          <button 
          onClick={handleRemoveCourse}
          disabled={loadingDel}
          className='bg-red-600 text-white px-4 py-2 rounded-md border-1 border-red-900 font-semibold cursor-pointer'>
            {loadingDel ? <ClipLoader size={30} color='white'/> : "Remove Course"}
          </button>
        </div>

        <form onSubmit={(e)=>e.preventDefault()} className='space-y-6'>
          <div>
            <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
            <input 
            id='title'
            type='text'
            placeholder='Course Title'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className='w-full border px-4 py-2 rounded-md'
            />
          </div>
          <div>
          <label htmlFor='subTitle' className='block text-sm font-medium text-gray-700 mb-1'>SubTitle</label>
          <input 
          id='subTitle'
          type='text'
          placeholder='Course SubTitle'
          value={subTitle}
          onChange={(e)=>setSubTitle(e.target.value)}
          className='w-full border px-4 py-2 rounded-md'
          />
          </div>
          <div>
          <label htmlFor='dis' className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
          <textarea
          id='dis'
          placeholder="Enter course description"
          rows="4"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          className='w-full border px-4 py-2 rounded-md h-24 resize-none'
          ></textarea>
          </div >

          <div className='flex flex-col md:flex-row sm:space-x-4 space-y-4 dm:sapye-y-0'>
            {/* for category */}
            <div className='flex-1 '>
              <label htmlFor="cat" className="block text-sm font-medium text-gray-700 mb-1">Course Category</label>
              <select 
              id="cat" 
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              className='w-full border px-4 py-2 rounded-md bg-white'>
                <option value="">Select Category</option>
                <option value="Web Development">Web Development</option>
                <option value="UI/UX Designing">UI/UX Designing</option>
                <option value="App Development">App Development</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* for lavel */}
            <div className='flex-1'>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">Course Level</label>
              <select 
              id="level" 
              value={level}
              onChange={(e)=>setLevel(e.target.value)}
              className='w-full border px-4 py-2 rounded-md bg-white'>
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            {/* for price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Course Price (INR)</label>
              <input
              id='price'
              type='number'
              placeholder='₹'
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              className='w-full border px-4 py-2 rounded-md'
              />
            </div>

          </div>

          <div>
            
              <div>
                <label htmlFor='Thumbnail' className="block text-sm font-medium text-gray-700 mb-1">Course Thumbnail</label>
                <input
                id='Thumbnail'
                type='file'
                accept='image/*'
                hidden
                ref={thumb}
                onChange={handleThumbnail}
              />
              </div>

              <div className='relative w-[300px] h-[200px]'>
                <img src={frontEndImage} alt='img' onClick={()=>thumb.current.click()}
                className='w-[100%] h-[100%] border-1 border-black rounded-[5px]'/>
                <FaEdit size={20} onClick={()=>thumb.current.click()} className='absolute right-2 top-2'/>
              </div>

            </div>

            <div className='flex items-center justify-start gap-[15px]'>
              <button className='bg-[#e9e8e8] hover:bg-red-200 text-black border-1 border-black rounded-md cursor-pointer px-4 py-2' onClick={()=>navigate('/courses')}>Cancel</button>
              <button 
              onClick={handleEditCourse}
              className='bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer' disabled={loading} >{loading ? <ClipLoader size={30} color="white"/> : "Save"}</button>
            </div>
        </form>
      </div>

    </div>  
  )
}


export default EditCourse
