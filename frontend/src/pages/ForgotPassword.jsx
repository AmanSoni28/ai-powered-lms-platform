import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../main.jsx";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";


const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [email,setEmail]=useState("")
  const [otp,setOtp]=useState("")
  const [newPassword,setNewPassword]=useState("")
  const [conPassword,setConPassword]=useState("")
  const [loading,setLoading]=useState(false)


  //step 1: enter email to get otp
  const sendOtp = async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/send-otp`, {email}, {withCredentials:true})
      const data=result.data
      console.log(data);
      toast.success(data.message)
      setStep(2)
      setLoading(false)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error in sending OTP");
      setLoading(false)
    }
  }

  //step 2: verify otp
  const verifyOtp=async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/verify-otp`, {email,otp}, {withCredentials:true})
      const data=result.data
      console.log(data);
      toast.success(data.message)
      setStep(3)
      setLoading(false)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error in verify OTP");
      setLoading(false)
    }
  }

  //step 3: reset password
  const resetPassword=async(e)=>{
    e.preventDefault()
    setLoading(true)  
    if(newPassword !== conPassword){
      toast.error("Passwords do not match");
      setLoading(false)
      return 
    }
    try {
      const result = await axios.post(`${serverUrl}/api/auth/reset-password`, {email,newPassword}, {withCredentials:true})
      const data=result.data
      console.log(data);
      toast.success(data.message)
      setLoading(false)
      navigate('/login')
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error in reset password");
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      {/* step 1 */}
      {step == 1 && <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Forgot Your Password
        </h2>
        <form onSubmit={sendOtp} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700" >Enter your email</label>
              <input 
              id="email"
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border-1 border- border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"/>
              <button className="w-full bg-black text-white py-2 px-4 rounded-md font-medium cursor-pointer mt-4 hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95" disabled={loading}>
                {loading ? <ClipLoader size={30} color="white"/> :  "Send OTP"}
              </button>
          </div>
        </form>
        <div onClick={()=>navigate('/login')}
        className="text-sm text-center mt-4 font-semibold cursor-pointer hover:underline">
           Back to Login
        </div>

      </div>}

      {/* step 2 */}
      {step ==2 && <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Enter OTP
        </h2>
        <form onSubmit={verifyOtp} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700" >Please enter the 4-digit code sent to your email</label>
              <input 
              id="otp"
              type="text" 
              placeholder="* * * *" 
              value={otp} 
              onChange={(e)=>setOtp(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border-1 border- border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"/>
              <button className="w-full bg-black text-white py-2 px-4 rounded-md font-medium cursor-pointer mt-4 hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95" disabled={loading}>
                {loading ? <ClipLoader size={30} color="white"/> : "Verify OTP"}
              </button>
          </div>
        </form>
        <div onClick={()=>navigate('/login')}
        className="text-sm text-center mt-4 font-semibold cursor-pointer hover:underline">
           Back to Login
        </div>

      </div>}

      {/* step 3 */}
      {step ==3 && <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reset Your Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter a new password below to regain access to your account.
        </p>
        <form onSubmit={resetPassword} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700" >Enter new password</label>
              <input 
              id="password"
              type="text" 
              placeholder="* * * * * * * * *" 
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border- border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"/>

            <label htmlFor="conpass" className="block text-sm font-medium text-gray-700 mt-4" >Confirm new password</label>
              <input 
              id="conpass"
              type="text" 
              placeholder="* * * * * * * * *" 
              value={conPassword}
              onChange={(e)=>setConPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border- border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"/>

              <button className="w-full bg-black text-white py-2 px-4 rounded-md font-medium cursor-pointer mt-4 hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95" disabled={loading}>
                {loading ? <ClipLoader size={30} color="white"/> : "Reset Password"}
              </button>
          </div>
        </form>
        <div onClick={()=>navigate('/login')}
        className="text-sm text-center mt-4 font-semibold cursor-pointer hover:underline">
           Back to Login
        </div>

      </div>}

    </div>
  );
};


export default ForgetPassword