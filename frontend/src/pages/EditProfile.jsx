import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setUserData } from "../redux/userSlice.js";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../main.jsx";


const EditProfile = () => {
    const {userData} = useSelector((state)=>state.user)
    const navigate = useNavigate()
    const [name, setName] = useState(userData?.name || "")
    const [description, setDescription] = useState(userData?.description || "")
    const [photoUrl, setPhotoUrl] = useState(null)
    const dispatch = useDispatch()
    const [loading,setLoading]=useState(false)


    const handleEditProfile = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            if (photoUrl) {
                formData.append("photoUrl", photoUrl);
            }
            const result = await axios.patch(`${serverUrl}/api/user/update-profile`, formData, {withCredentials:true});
            const data = result.data;
            console.log(data);
            toast.success(data.message);
            setLoading(false);
            navigate('/profile');
            dispatch(setUserData(data.user));
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error in updating profile");
            setLoading(false);
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white p-8 rounded-2xl max-w-xl shadow-md w-full relative">

        <div className="absolute top-8 left-6 text-gray-500 hover:text-gray-800 cursor-pointer" onClick={()=>navigate('/profile')}>
          <FaArrowLeft className="size-6"/>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
        

        <form onSubmit={handleEditProfile} className="space-y-5">

          <div className="flex flex-col items-center text-center"> 
            {userData?.photoUrl ? <img src={userData?.photoUrl } alt="profile_pic" className="w-32 h-32 border-4 border-black rounded-full object-cover cursor-pointer mx-auto"/>
          : <div className="w-32 h-32 border-4 border-black rounded-full flex items-center justify-center text-[40px] bg-gray-200 cursor-pointer mx-auto">
              {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
            </div>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="image"
            className="text-gray-700 font-semibold mb-1 mt-3" >Select Profile Picture</label>
            <input 
            type="file" 
            id="image" 
            name="photoUrl" 
            accept="image/*"
            onChange={(e)=>setPhotoUrl(e.target.files[0])}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>

            <label className="block text-gray-700 font-semibold mb-1 mt-3" htmlFor="name">User Name</label>
            <input 
            type="text" 
            id="name" 
            placeholder={userData?.name || "Enter your name"}
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>

            <label className="block text-gray-700 font-semibold mb-1 mt-3">Email</label>
            <input 
            type="text" 
            id="email" 
            placeholder={userData?.email}
            readOnly
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            
            <label className="block text-gray-700 font-semibold mb-1 mt-3" htmlFor="description">Bio</label>
            <textarea
            id="description" 
            name="description"
            placeholder={"Tell us about yourself"}
            rows={3}
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <button className=" mt-6 w-full bg-black text-white font-bold px-5 py-2 rounded-xl active:bg-[#4b4b4b] cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95" disabled={loading}>
                {loading ? <ClipLoader size={30} color="white"/>     : "Save Changes"}
            </button>

          </div>
        </form>
        
      </div>
    </div>
  )
}
                
export default EditProfile