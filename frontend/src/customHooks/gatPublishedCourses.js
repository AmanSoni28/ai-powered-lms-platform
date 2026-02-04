import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { serverUrl } from "../main.jsx"
import { setPublishedCoursesData } from "../redux/courseSlice.js"

const getPublishedCourses = () => {
    const dispatch=useDispatch()
    const {userData}=useSelector((state)=>state.user)
    const {lectureData}=useSelector((state)=>state.lecture)
    const {reviewData}=useSelector((state)=>state.review)
    useEffect(()=>{
     const publishedCourses=async ()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/course/published-courses`,{withCredentials:true})
            // console.log(result.data)
            dispatch(setPublishedCoursesData(result?.data))
        } catch (error) {
            console.log("getPublishedCourses error:",error);
            dispatch(setPublishedCoursesData(null))
        }
     }
      publishedCourses()   
    },[userData,lectureData,reviewData])
}

export default getPublishedCourses
