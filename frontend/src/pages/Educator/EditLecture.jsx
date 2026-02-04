import axios from "axios";
import { useState } from "react";
import { FaArrowLeft, FaBullseye } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../../main";
import { toast } from "react-toastify";
import { setLectureData } from "../../redux/lectureSlice";

const EditLecture = () => {
    const navigate = useNavigate()
    const {courseId,lectureId} = useParams()
    const {lectureData} = useSelector((state)=>state.lecture)
    const selectedLecture = lectureData.find((lecture)=>lecture._id==lectureId || "")
    const [lectureTitle,setLectureTitle]=useState(selectedLecture.lectureTitle)
    const [videoUrl,setVideoUrl]=useState("")
    const [isPreviewFree,setIsPreviewFree]=useState(false)
    const [loading,setLoading]=useState(false)
    const [loadingDel,setLoadingDel]=useState(false)

    const dispatch=useDispatch()

    const formData = new FormData()
    formData.append("lectureTitle",lectureTitle)
    formData.append("videoUrl",videoUrl)
    formData.append("isPreviewFree",isPreviewFree)

    const handleEditLecture=async(e)=>{
        e.preventDefault()
        setLoading(true)
    try {
        const result=await axios.patch(`${serverUrl}/api/course/edit-lecture/${lectureId}`, formData, {withCredentials:true})
        const data=result.data
        // console.log(data);
        toast.success(data?.message)
        const updateLectureData=lectureData.map((lecture)=>(lecture._id === lectureId ? data.lecture : lecture))
        dispatch(setLectureData(updateLectureData))
        setLoading(false)
        navigate(`/createlecture/${courseId}`)
    } catch (error) {
        toast.error(error?.response?.data?.message)
        setLoading(false)
    }
    }

    const handleRemoveLecture=async()=>{
      setLoadingDel(true)
    try {
      const result=await axios.delete(`${serverUrl}/api/course/remove-lecture/${lectureId}`, {withCredentials:true})
      const updatedLectureData=lectureData.filter((lecture)=>(lecture._id !== lectureId))
      dispatch(setLectureData(updatedLectureData))
      toast.success(result?.data?.message)
      navigate(`/createlecture/${courseId}`)
    } catch (error) {
       toast.error(error?.response?.data?.message)
    } finally {
        setLoadingDel(false)
    }
    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6">
      
      {/* header */}
        <div className="flex items-center gap-2 mb-2">
          <FaArrowLeft onClick={()=>navigate(`/createlecture/${courseId}`)}
          className="text-gray-600 cursor-pointer"/>
          <h2 className="text-xl font-semibold text-gray-800">Update Course Lecture</h2>
        </div>

        <button onClick={handleRemoveLecture}
         className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm font-semibold" disabled={loadingDel}>
          {loadingDel ? <ClipLoader size={30} color="white"/> : "Remove Lecture"}
        </button>
        <form onSubmit={handleEditLecture}>
        <div className="space-y-4">
          <div >
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Lecture Title<span className="text-rose-500"> *</span></label>
            <input 
             id="title"
             type="text"
             required
             placeholder="e.g. Introduction to MERN Stack"
             value={lectureTitle}
             onChange={(e)=>setLectureTitle(e.target.value)}
             className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black "/>
          </div>

          <div >
            <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-1">Video<span className="text-rose-500"> *</span></label>
            <input 
             id="video"
             type="file"
             required                        
             accept="video/*"
             onChange={(e)=>setVideoUrl(e.target.files[0])}
             className="w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2  file:px-4 file:rounded-md file:text-sm file:border-0 file:text-white file:bg-gray-700 hover:file:bg-gray-500  "/>
          </div>

          <div className="flex items-center gap-3">
            <input 
            id="isFree" 
            type="checkbox"
            onChange={()=>setIsPreviewFree(prev=>!prev)}
            />
            <label htmlFor="isFree" className="text-sm text-gray-700">Is this Video Free</label>
          </div>
        </div>

        {loading ? <p>Uploading video... Please wait.</p> : ""}

        <div className="pt-4"> 
          <button className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95" disabled={loading}>
            {loading ? <ClipLoader size={30} color="white"/> : "Update Lecture"}
          </button>
        </div>
        </form>
      </div>

    </div>
  )
}

export default EditLecture