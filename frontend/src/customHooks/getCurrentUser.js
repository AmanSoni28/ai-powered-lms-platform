import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { serverUrl } from "../main.jsx"
import { setUserData } from "../redux/userSlice.js"


const getCurrentUser=()=>{
    // console.log("hello")
    const dispatch=useDispatch()
    useEffect(()=>{
     const fetchUser=async ()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/user/current-user`,{withCredentials:true})
            // console.log("hello")
            dispatch(setUserData(result.data))
        } catch (error) {
            console.log("getCurrentUser error:",error);
            dispatch(setUserData(null))
        }
     }
      fetchUser()
    },[])
}

export default getCurrentUser