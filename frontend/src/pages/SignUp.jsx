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

const SignUp = () => {
    const [show,setShow] = useState(false)
    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("") 
    const [role,setRole] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()


    const handleSignUp = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`, {name,email,password,role},{withCredentials:true})
      const data=result.data
      // console.log(data);
      setLoading(false)
      dispatch(setUserData(data.user))
      toast.success(data?.message)
      setName("")
      setEmail("")
      setPassword("")
      setRole("")  
      navigate('/')
    } catch (error) {
      toast.error(error?.response?.data?.message || "SignUp Error");
      setLoading(false)
    }
  }
  
  const googleSignUp = async ()=> {
    try {
      
      if(!role) {
        toast.error("Please select a role")
        return
      }

      const response = await signInWithPopup(auth, googleProvider);
      // console.log(response);
      const user=response.user
      const Gname=user.displayName
      const Gemail=user.email

      const result = await axios.post(`${serverUrl}/api/auth/google-auth`, {name:Gname, email:Gemail, role},{withCredentials:true})

      const data = result.data;
      toast.success("Google SignUp Successfully")
      dispatch(setUserData(data.user))
      navigate('/')
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Google SignUp Error");
    }                                         
  } 
                            

  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center">
      <form onSubmit={ handleSignUp } className="w-[90%] md:w-200 h-[90%] bg-white shadow-xl rounded-2xl flex">

        {/* left div */}
        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3">

          <div>
            <h1 className="font-semibold text-black text-2xl">let's get started</h1>
            <h2 className="text-[#999797] text-[18px]">Create your account</h2>
          </div>

          <div className="flex flex-col gap-2 items-start justify-center items-center px-2 w-[80%]">
             
            <div className="w-[100%] flex flex-col gap-1 justify-center items-start">
              <label htmlFor="name" className="font-semibold">Name</label>
              <input 
              id="name"
              type="text"
              placeholder="Enter name" 
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6]  text-[15px] px-[20px]"/>
            </div> 

            <div className="w-[100%] flex flex-col gap-1 justify-center items-start">
              <label htmlFor="email" className="font-semibold">Email</label>
              <input 
              id="email"
              type="email"
              placeholder="Enter email" 
              value={email}
              onChange={(e)=>setEmail (e.target.value)}
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6]  text-[15px] px-[20px]"/>
            </div>

            <div className="w-[100%] flex flex-col gap-1 justify-center items-start relative">  
              <label htmlFor="password" className="font-semibold">Password</label>
              <input 
              id="password"
              type={show?"text":"password"}
              placeholder="Enter password" 
              value={password}
              onChange={(e)=>setPassword (e.target.value)}
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6]  text-[15px] px-[20px]"/>
              <span className="absolute top-8 right-4 text-gray-500 font-semibold cursor-pointer"
                onClick={()=>setShow((prev)=>!prev)}>{show?<IoIosEye className="size-6"/>:<IoMdEyeOff className="size-6"/>}
              </span>
            </div>
          

            <div className="flex justify-center gap-20 w-[100%] items-center ">
              <span onClick={()=>setRole("student")} className={`px-[10px] py-[5px] border-2 rounded-xl font-semibold
               cursor-pointer" ${ role === "student" ? "border-black text-black ": "border-[#e7e6e6] text-gray-500"}`}>Student</span>
               
              <span onClick={()=>setRole("educator")} className={`px-[10px] py-[5px] border-2 rounded-xl font-semibold
               cursor-pointer" ${role === "educator" ? "border-black text-black " : "border-[#e7e6e6] text-gray-500"}`}>Educator</span>
            </div>

            <button className="w-[100%] h-[40px] bg-black text-white flex justify-center items-center rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95" disabled={loading}>
              {loading ? <ClipLoader size={30} color="white" /> : "SignUp"}
            </button>

            <div className="w-[100%] flex gap-6 items-center justify-center">
              <span className="w-[20%]  h-[0.5px] bg-[#c4c4c4]"></span>
              <span className="">Or continue</span>
              <span className="w-[20%]  h-[0.5px] bg-[#c4c4c4]"></span>
            </div>

            <div className="w-[100%] h-[40px] border-1 border-black rounded-xl flex justify-center items-center  bg-gray-200 hover:border-2 hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95" onClick={googleSignUp}>
                <img src="/google_logo.png" alt="google_logo" className="h-[40px]"/>
                <span className="font-semibold">oogle</span>
            </div>

          </div>
           <p className="mt-3 text-gray-600 text-[14px]">
            already have an account?
             <span className="ml-1 font-semibold hover:underline cursor-pointer hover:font-bold" onClick={()=> navigate('/login')}>
              LogIn
             </span>
           </p>

        </div>

        {/* right div */}
        <div className="w-[50%] h-[100%] rounded-r-2xl  bg-black md:flex items-center justify-center flex-col hidden relative">
          <img src="/LMS_Signup.png" alt="logo" className="w-40 " />
          <span className="text-white text-2xl font-bold">VIRTUAL COURSES</span>
        </div>

      </form>

    </div>
  );
};

export default SignUp