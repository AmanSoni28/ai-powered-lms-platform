import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedCourse } from "../redux/courseSlice";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { IoIosPlayCircle } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../main.jsx";
import Card from "../component/Card.jsx";
import { toast } from "react-toastify";
import { setUserData } from "../redux/userSlice.js";
import { ClipLoader } from "react-spinners";
import { setReviewData } from "../redux/reviewSlice.js";

const ViewCourse = () => {
    const navigate=useNavigate()
    const {courseId}=useParams()
    const {publishedCoursesData}=useSelector((state=>state.course))
    const {selectedCourse}=useSelector((state)=>state.course)
    const dispatch=useDispatch()
    const [selectedLecture,setSelectedLecture]=useState("")
    const [creatorData,setCreatorData]=useState("")
    const [creatorCourses,setCreatorCourses]=useState([])
    const {userData}=useSelector((state)=>state.user)
    const [isEnrolled,setIsEnrolled]=useState(false)
    const [rating,setRating]=useState(0)
    const [comment,setComment]=useState("")
    const [loading,setLoading]=useState(false)
    const {reviewData}=useSelector((state)=>state.review)
    


    useEffect(() => {
      const course = publishedCoursesData.find((course) => course._id === courseId)
      if (course) {
       dispatch(setSelectedCourse(course))
      }
    }, [publishedCoursesData, courseId, dispatch])

    useEffect(() => {
      const fetchCreator = async () => {
      try {
        if (selectedCourse?.creator) {
          const result = await axios.post(`${serverUrl}/api/course/creator`, {creatorId: selectedCourse.creator }, { withCredentials: true })
          // console.log(result.data)
          setCreatorData(result.data);
         }
        } catch (error) {
        console.error("Error fetching creator:", error);
        }
      };

    fetchCreator();
    }, [selectedCourse]);
    
    useEffect(()=>{
      if(creatorData?._id && publishedCoursesData?.length>0){
        const filterCreatorCourses = publishedCoursesData.filter((course)=>course.creator === creatorData?._id && course?._id !== courseId)
        setCreatorCourses(filterCreatorCourses)
      }

    },[creatorData,publishedCoursesData])
//  console.log(creatorCourses);
    
    const handleEnroll = async (userId,courseId)=>{
      try {
        const orderData = await axios.post(`${serverUrl}/api/order/razorpay-order`, {userId, courseId}, { withCredentials: true })
        console.log(orderData.data);
        const data=orderData.data
        
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount:data.amount,
          currency:data.currency,
          name:"VIRTUAL COURSES",
          description:"COURSE ENROLLMENT PAYMENT",
          order_id:data.id,
          handler:async function(response){
            // console.log("RazorPay Response :", response);
          try {
            const verifyPayment=await axios.post(`${serverUrl}/api/order/verifypayment`, {userId, courseId, ...response}, { withCredentials: true })
           
            dispatch(setUserData({...userData,                 //update userData
              enrolledCourses: userData.enrolledCourses.includes(courseId) ? userData.enrolledCourses : [...userData.enrolledCourses, courseId]
            }))

            toast.success(verifyPayment.data.message)
            setIsEnrolled(true)
            
          } catch (error) {
            toast.error(error?.response?.data?.message)
          }
            
          }
        }
        
        const rzp = new window.Razorpay(options)          //here we able to use Razorpay because we add script at index.html
        rzp.open()              
      } catch (error) {
       toast.error(error?.response?.data?.message || "something went wrong while enrolled.")
      }
   }

   const checkEnrollment=()=>{
     const verify = userData?.enrolledCourses?.some((c)=>(typeof(c)==='string' ? c : c?._id).toString()===courseId?.toString())  
     if(verify){
      setIsEnrolled(true)
     }
   }

   useEffect(()=>{
    checkEnrollment()
   },[publishedCoursesData, courseId, userData])

  const handleReview = async () => {
  setLoading(true)
  try {
    const result = await axios.post(`${serverUrl}/api/review/create-review`, { rating, comment, courseId }, { withCredentials: true })

    const data = result.data
    toast.success(data.message)
    // console.log(data)
    dispatch(setReviewData([data.review, ...reviewData]))
    setRating(0)
    setComment("")

  } catch (error) {
    toast.error(error?.response?.data?.message)
    setRating(0)
    setComment("")
  } finally {
    setLoading(false)
  }
}

const calculateAvgRaview = (reviews)=>{
  if(!reviews || reviews.length === 0 ) return

  const total = reviews.reduce((sum, review)=> sum+review.rating, 0)

  return (total/reviews.length).toFixed(1)
}

const avgRating = calculateAvgRaview(selectedCourse?.reviews)


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative">

        {/* top section */}
        <div className="flex flex-col md:flex-row gap-6 ">
          {/* thumbnail */}
          <div className="w-full md:w-1/2">
            <FaArrowLeft className="text-black w-[22px] h-[22px] cursor-pointer mb-2" onClick={()=>navigate('/')}/>
            {selectedCourse?.thumbnail  ? <img src={selectedCourse.thumbnail} alt="thumbnail" className="rounded-xl"/>  : <img src="/LMS_emptyCourse.png" alt="emptyimg" className="rounded-xl"/>}
          </div>

          {/* course Info */}
          <div className="flex-1 space-y-2 mt-[20px]">
            <h2 className="text-2xl font-bold ">{selectedCourse?.title}</h2>
            <p className="text-gray-600">{selectedCourse?.subTitle}</p>
            <div className="flex items-start flex-col justify-between">
              <div className="text-yellow-500 font-medium flex gap-2">
                <span className="flex items-center justify-start gap-1">{avgRating}<FaStar/></span>
                <span className="text-gray-500 flex">({selectedCourse?.reviews?.length} Reviews)</span>
              </div>
              <div>
                <span className="text-xl font-semibold text-black">₹{selectedCourse?.price}</span>     
                <span className="line-through text-sm text-gray-400"> ₹599</span>     
              </div>

              <ul className="text-sm text-gray-700 space-y-1 p-2">
                <li>✅ 10+ hours of video content</li>
                <li>✅ Lifetime access to course materials</li>
              </ul>

              {!isEnrolled ? <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-700 mt-3" onClick={()=>handleEnroll(userData._id,courseId)}>Enroll Now</button> : <button className="bg-green-200  text-green-600 px-6 py-2 rounded hover:bg-green-100 border-green-400 border-1 mt-3" onClick={()=>navigate("/viewlectures")}>Watch Now</button>}

            </div>
          </div>
          

        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">What You'll Learn</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Learn {selectedCourse?.category} from Beginnings.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>
          <p className="text-gray-700 space-y-1">Basic programming knowledge is helpful but not required.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Who This Course is For</h2>
          <p className="text-gray-700 space-y-1">Beginners, aspiring developers, and professionals looking to upgrade skills.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-1 text-gray-800 ">Course Curriculum</h2>
            <p className="text-sm text-gray-500 mb-4">{selectedCourse?.lectures?.length} Lectures</p>

            <div className="flex flex-col gap-3">
             {selectedCourse?.lectures?.map((lecture)=>(
               <button 
               key={lecture._id} 
               onClick={()=>{ if(lecture.isPreviewFree) setSelectedLecture(lecture)}}
               disabled={!lecture.isPreviewFree}
               className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left ${lecture.isPreviewFree ? "hover:bg-gray-100 cursor-pointer border-gray-300" : "cursor-not-allowed opacity-60 border-gray-200"}  
                 ${lecture._id === selectedLecture._id ? "font-semibold bg-gray-100 border-gray-400" : ""}` }>
                <span className="text-lg text-gray-700">{lecture.isPreviewFree ?  <IoIosPlayCircle size={20}/> : <FaLock size={15}/>}</span>
                <span className="text-sm text-gray-800">{lecture.lectureTitle}</span>
               </button>
             ))
             } 
            </div>

          </div> 

          <div className="bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center">
              {selectedLecture?.videoUrl ? <video src={selectedLecture.videoUrl} controls className="w-full h-full object-cover"/> : <span className="text-white text-md ">Selcect a preview lecture to watch</span>}
            </div>
          </div> 

        </div>

        <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-2">Write a Review</h2>
            <div className="mb-4">
              <div className="flex gap-1 mb-2">
                {
                    [1,2,3,4,5].map((star)=>(
                      <FaStar key={star} 
                      onClick={()=>setRating(star)}
                      className={star <= rating ? "fill-amber-300" : "fill-gray-300"}/>
                    ))
                }
              </div>
              <textarea
              rows={3}
              placeholder="Write your review here..."
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"/>
               <button className="bg-black text-white mt-3 px-4 py-2  rounded hover:bg-gray-800" onClick={handleReview} disabled={loading}>{loading ? <ClipLoader size={30} color="white"/>  : "Submit Review"}</button>
            </div>
        </div>     
        {/* for Creator Info */}
        <div className="flex items-center gap-4 border-t pt-2">
          {creatorData?.photoUrl ? <img src={creatorData?.photoUrl} alt="" className="border-1 border-gray-200 w-16 h-16  rounded-full object-cover"/> : <img src="/LMS_emptyUser.png" alt="" className="border-1 border-gray-200 w-16 h-16  rounded-full object-cover"/>}
          <div>
            <h2 className="text-lg font-semibold">{creatorData?.name}</h2>
            <p className="md:text-sm text-gray-600 text-[10px]">{creatorData?.description}</p>
            <p className="md:text-sm text-gray-600 text-[10px]">{creatorData?.email}</p>
          </div>
        </div>
        <div>
            <p className="text-xl font-semibold mb-2">Other Published Courses by the Educator</p>
        </div>

        <div className="w-full transition-all duration-300 py-[20px] flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-[40px]">
          {creatorCourses?.map((course)=>(
            <Card key={course._id} thumbnail={course.thumbnail} title={course.title} category={course.category} price={course.price} id={course._id}/>
          ))
          }
        </div>

      </div>

    </div>
  )
}

export default ViewCourse

