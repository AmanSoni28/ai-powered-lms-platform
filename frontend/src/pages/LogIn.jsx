import { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import {toast} from 'react-toastify'
import { serverUrl } from "../main.jsx";
import { ClipLoader } from "react-spinners"; 
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase.js";
import { FaArrowLeft } from "react-icons/fa6";

const LogIn = () => {
    const [show,setShow] = useState(false)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()

    const handleLogin = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/login`, {email,password},{withCredentials:true})
      const data=result.data
      // console.log(data);
      toast.success(data?.message)
      dispatch(setUserData(data.user))
      setLoading(false)
      setEmail("")
      setPassword("")
      navigate('/')
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Error");
      setLoading(false)
    }
  }

    const googleLogIn = async ()=> {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      // console.log(response);
      const user=response.user
      const Gname=user.displayName
      const Gemail=user.email
      const role="student"

      const result = await axios.post(`${serverUrl}/api/auth/google-auth`, {name:Gname, email:Gemail, role},{withCredentials:true})

      const data = result.data;
      toast.success("Google Login Successfully")
      dispatch(setUserData(data.user))
      navigate('/')
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Google Login Error");
    }                                         
  } 

  return (
    <div className="bg-[#dddbdb] w-[vw] h-[100vh] flex items-center justify-center">
      <form onSubmit={handleLogin} className="w-[90%] md:w-200 h-[85%] bg-white shadow-xl rounded-2xl flex">

        {/* left div */}
        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3 relative">

          <FaArrowLeft size={20} className="absolute top-[20px] left-[20px] cursor-pointer hover:text-gray-600" onClick={()=>navigate('/')}/>

          <div>
            <h1 className="font-semibold text-black text-2xl">Welcome back</h1>
            <h2 className="text-[#999797] text-[18px]">Login your account</h2>
          </div>

          <div className="flex flex-col gap-2 items-start justify-center items-center px-2 w-[80%]"> 

            <div className="w-[100%] flex flex-col gap-1 justify-center items-start">
              <label htmlFor="email" className="font-semibold">Email</label>
              <input 
              id="email"
              type="email"
              placeholder="Enter email" 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6]  text-[15px] px-[20px]"/>
            </div>

            <div className="w-[100%] flex flex-col gap-1 justify-center items-start relative">  
              <label htmlFor="password" className="font-semibold">Password</label>
              <input 
              id="password"
              type={show?"text":"password"}
              placeholder="Enter password" 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6]  text-[15px] px-[20px]"/>
              <span className="absolute top-8 right-4 text-gray-500 font-semibold cursor-pointer"
                onClick={()=>setShow((prev)=>!prev)}>{show?<IoIosEye className="size-6"/>:<IoMdEyeOff className="size-6"/>}
              </span>
            </div>

            <button className="w-[100%] h-[40px] bg-black text-white flex justify-center items-center rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95"
            disabled={loading}>
              {loading ? <ClipLoader size={30} color="white" /> : "LogIn"}
            </button>

            <div className="w-[100%] flex justify-center items-center" onClick={()=>navigate('/forgot-password')}>
              <span className="text-[#999797] hover:underline cursor-pointer">Forgot password?</span>
            </div>

            <div className="w-[100%] flex gap-6 items-center justify-center">
              <span className="w-[20%]  h-[0.5px] bg-[#c4c4c4]"></span>
              <span className="">Or continue</span>
              <span className="w-[20%]  h-[0.5px] bg-[#c4c4c4]"></span>
            </div>

            <div className="w-[100%] h-[40px] border-1 border-black rounded-xl flex justify-center items-center  bg-gray-200 hover:border-2 hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95" onClick={googleLogIn}>
                <img src="/google_logo.png" alt="google_logo" className="h-[40px]"/>
                <span className="font-semibold">oogle</span>
            </div>
          </div>
          <p className="mt-3 text-gray-600 text-[14px]">
            Want to create a new account?
            <span className="ml-1 font-semibold hover:underline cursor-pointer hover:font-bold" onClick={()=> navigate('/signup')}>
              SignUp
            </span>
          </p>
        </div>

        {/* right div */}
        <div className="w-[50%] h-[100%] rounded-r-2xl  bg-black md:flex items-center justify-center flex-col hidden">
          <img src="/LMS_Signup.png" alt="logo" className="w-40 " />
          <span className="text-white text-2xl font-bold">VIRTUAL COURSES</span>
        </div>

      </form>

    </div>
  );
};

export default LogIn