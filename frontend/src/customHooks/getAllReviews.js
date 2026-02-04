import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { serverUrl } from "../main.jsx"
import { setReviewData } from "../redux/reviewSlice.js"

const getAllReviews = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
     const allReviews=async ()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/review/get-reviews`,{withCredentials:true})
            // console.log(result.data)
            dispatch(setReviewData(result?.data))
        } catch (error) {
            console.log("getReviews error:",error);
            dispatch(setReviewData(null))
        }
     }
      allReviews()   
    },[])
}

export default getAllReviews