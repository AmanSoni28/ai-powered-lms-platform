import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { serverUrl } from "../main.jsx"
import { setCreatorCoursesData } from "../redux/courseSlice.js"

const getCreatorCourses = () => {
    // console.log("HELLO");
    const dispatch=useDispatch()
    const {userData}=useSelector((state)=>state.user)
    const {lectureData}=useSelector((state)=>state.lecture)
    useEffect(()=>{
     const creatorCourses=async ()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/course/creator-courses`,{withCredentials:true})
            // console.log(result.data)
            // console.log("MODI");
            dispatch(setCreatorCoursesData(result.data))
        } catch (error) {
            console.log("getCurrentUser error:",error);
            dispatch(setCreatorCoursesData(null))
        }
     }
      creatorCourses()   
    },[userData,lectureData])
}

export default getCreatorCourses






