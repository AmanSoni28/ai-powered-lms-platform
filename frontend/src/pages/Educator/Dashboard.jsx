import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'

const Dashboard = () => {
    const {userData}=useSelector(state=>state.user)
    const navigate=useNavigate()
    const {creatorCoursesData} = useSelector(state=>state.course)

    const CourseProgressData = creatorCoursesData?.map((course)=>({
      name:course.title?.slice(0,10) + "...",
      lectures:course.lectures?.length || 0
    })) || []

    const EnrollData = creatorCoursesData?.map((course)=>({
      name:course.title?.slice(0,10) + "...",
      enrolled:course.enrolledStudents?.length || 0
    })) || []

    const totalEarning = creatorCoursesData?.reduce((sum,course)=>{
      const studentCount=course.enrolledStudents?.length || 0 
      const courseRevenue=course.price ? course.price*studentCount : 0
      return (sum+courseRevenue)
    },0) || 0
  
  return (
    <div className='flex min-h-screen bg-gray-100'>
      <div className='w-full px-6 py-10 bg-gray-50 space-y-10'>
        {/* main section */}
        <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6'>
          {userData?.photoUrl ? (
            <img src={userData.photoUrl} alt="profile picture" className="w-28 h-28 rounded-full object-cover border-4 border-black shadow-md"/>
              ) : (
            <div className="w-28 h-28 rounded-full bg-black text-white flex items-center justify-center text-4xl font-semibold shadow-md">
               {userData?.name?.charAt(0).toUpperCase()}
           </div>
          )}

          <div className='text-center md:text-left space-y-1'>
            <h1 className='text-2xl font-bild text-gray-800'>Welcome, {userData?.name  || "Educator"}👋</h1>
            <h1 className='text-xl font-semibold text-gray-800'>Total Earning : ₹ {totalEarning.toLocaleString()}</h1>
            <p className='tetx-gary-600 text-sm'>{userData?.description || "Start Creating Courses for Your Students"}</p>
            <h1 onClick={()=>navigate('/courses')}
            className='px-[10px] text-center py-[10px] border-2 bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center'>Create Courses</h1>
          </div>
           
          <FaArrowLeft size={22} className="absolute top-[2%] left-[2%] text-black cursor-pointer" onClick={()=>navigate('/')}/>

        </div> 

        {/* Graph section */}
        <div className='max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>

          {/* for course progress graph */}
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-lg font-semibold mb-4'>Course Progress (Lectures)</h2>
            <ResponsiveContainer width="100%" height={300}>                                        {/*responsive chart*/}
              <BarChart data={CourseProgressData}>
                <CartesianGrid strokeDasharray="3 3"/>                                             {/*doted grid*/}
                <XAxis dataKey="name"/> 
                <YAxis label={{ value: "Lectures", angle: -90, position: "insideLeft", textAnchor: "middle", dx: 10}}/>         
                <Tooltip/>                                                                         {/* hover then give details*/}
                <Bar dataKey="lectures" fill='black' radius={[5,5,0,0]}/>          
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* for enrolledStudent graph */}
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-lg font-semibold mb-4'>Student Enrolled</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={EnrollData}>
                <CartesianGrid strokeDasharray="3 3"/>            
                <XAxis dataKey="name"/>
                <YAxis label={{ value: "Enrolled Students", angle: -90, position: "insideLeft", textAnchor: "middle" }} />
                <Tooltip/>                                  
                <Bar dataKey="enrolled" fill='black' radius={[5,5,0,0]}/>          
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard