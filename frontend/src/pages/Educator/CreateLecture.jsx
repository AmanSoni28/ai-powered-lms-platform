import axios from "axios";
import { useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../main.jsx";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { setLectureData } from "../../redux/lectureSlice.js";
import { FaEdit } from "react-icons/fa";

const CreateLecture = () => {
    const navigate = useNavigate()
    const {courseId}= useParams()
    const [lectureTitle, setLectureTitle]=useState("")
    const [loading,setLoading] = useState(false)
    const {lectureData}=useSelector((state)=>state.lecture)
    const dispatch=useDispatch()

    const handleCreateLecture = async ()=>{
    setLoading(true)
    try {                          
        const result = await axios.post(`${serverUrl}/api/course/cteare-lecture/${courseId}`, {lectureTitle}, {withCredentials:true})
        const data = result.data
        console.log(data);
        dispatch(setLectureData([...lectureData, data?.lecture]))
        setLoading(false)
        toast.success(data?.message)
        setLectureTitle("")
                          
    } catch (error) {
         toast.error(error?.response?.data?.message)  
         setLoading(false)
    }
    }

  useEffect(()=>{
    const getCourseLecture = async()=>{
    try {
      const result =await axios.get(`${serverUrl}/api/course/course-lecture/${courseId}`, {withCredentials:true})
      const data=result.data
      // console.log(data);
      dispatch(setLectureData(data.lectures))
    } catch (error) {
      console.log("getCourseLecture error", error);
    }
    }
    getCourseLecture()
  },[]) 

    

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-6">
        {/* header */}
        <div className="mb-6"> 
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Let's Add a Lectures</h1>
          <p className="text-sm text-gray-500">Enter the title and add your video lecture to enhance your course content</p>
        </div>
        
        {/* input */}
        <input 
        type="text"
        placeholder="e.g. Introduction to MERN Stack"
        value={lectureTitle}
        onChange={(e)=>setLectureTitle(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-4 "/>

        {/* button  */}
        <div className="flex gap-4 mb-6">
          <button onClick={()=>navigate(`/editcourse/${courseId}`)}
          className=" flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-semibold"><FaArrowLeft/>Back to Course</button>
          <button onClick={handleCreateLecture} className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-600 transition-all text-sm font-semibold shadow" disabled={loading}>{loading ? <ClipLoader size={30}  color="white"/> : "+ Create Lecture"}</button>
        </div>

        <div className="space-y-2">
          {lectureData?.map((lecture,index)=>(
            <div key={lecture._id} className="bg-gray-100 rounded-md flex justify-between items-center p-3 text-sm font-medium text-gray-700">
              <span>{`Lecture-${index+1} : ${lecture.lectureTitle}`}</span>
              <FaEdit size={20} onClick={()=>navigate(`/editlecture/${courseId}/${lecture._id}`)} className="text-gray-500 cursor-pointer hover:text-gray-700"/>
            </div>
          ))
          
          }

        </div>
      
      </div >
    </div>
  )
}

export default CreateLecture