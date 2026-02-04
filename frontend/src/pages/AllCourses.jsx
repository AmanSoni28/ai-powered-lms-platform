import { useNavigate } from "react-router-dom";
import Nav from "../component/Nav"
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Card from "../component/Card";

const AllCourses = () => {
    const navigate=useNavigate()
    const {publishedCoursesData}=useSelector((state)=>state.course)
    const [category,setCategory]=useState([])
    const [filterCourses,setFilterCourses]=useState([])
    const [isSidebarShow,setIsSidebarShow]=useState(false)

    const toggleCategory = (e)=>{
       if(category.includes(e.target.value)){
        setCategory(prev=>prev.filter(c => c !== e.target.value))
       }else{
        setCategory(prev => [...prev, e.target.value])
       }
    }

    const applyFilter = ()=>{
        let publishedCoursesCopy = publishedCoursesData?.slice()
        if(category.length > 0){
            publishedCoursesCopy = publishedCoursesCopy?.filter(c => category?.includes(c.category))
        }
        setFilterCourses(publishedCoursesCopy)
    }

    useEffect(()=>{
        console.log("hello");
        
        setFilterCourses(publishedCoursesData)
    },[publishedCoursesData])

    useEffect(()=>{
        applyFilter()
    },[category])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Nav/>

      <button onClick={()=>setIsSidebarShow(prev=>!prev)}
      className="fixed top-20 left-4 z-50 bg-white px-3 py-1 rounded-xl md:hidden border-2 border-black font-semibold">
       {isSidebarShow ? 'Hide' : 'show'} Filter
      </button>
      
      {/* sidebar */}
      <aside className={`w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 pt-[130px] md:pt-[90px] border-r border-gray-200 z-5 shadow-md transition-transform duration-300 ${isSidebarShow ? "translate-x" :  "-translate-x-full"} md:block md:translate-x-0`}>
        <h2 className="text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6"><FaArrowLeft className='text-white cursor-pointer' onClick={()=>navigate('/')}/>Filter by Category</h2>

        <form onSubmit={(e)=>e.preventDefault()} className="space-y-4 text-sm bg-gray-600 border-white text-white border p-[20px] rounded-2xl">
          <button className="p-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer" onClick={()=>navigate('/search')}>Search with AI <img src="/LMS_AI_HOME.png" alt="ai" className="h-[25px] w-[25px]"/></button>

          <label htmlFor="web" className="text-white flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
            <input 
            type="checkbox" 
            id="web" 
            value={"Web Development"}
            onChange={toggleCategory}
            className="accent-black w-4 h-4 rounded-md"/> Web Devlopment
          </label>

          <label htmlFor="ui" className="text-white flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
            <input 
            type="checkbox" 
            id="ui" 
            value={"UI/UX Designing"}
            onChange={toggleCategory}
            className="accent-black w-4 h-4 rounded-md"/> UI/UX Designing
          </label>

          <label htmlFor="app" className="text-white flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
            <input 
            type="checkbox" 
            id="app" 
            value={"App Devlopment"}
            onChange={toggleCategory}
            className="accent-black w-4 h-4 rounded-md"/> App Devlopment
          </label>

          <label htmlFor="hack" className="text-white flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
            <input 
            type="checkbox" 
            id="hack" 
            value={"Ethical Hacking"}
            onChange={toggleCategory}
            className="accent-black w-4 h-4 rounded-md"/> Ethical Hacking
          </label>

          <label htmlFor="AI" className="text-white flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
            <input 
            type="checkbox" 
            id="AI" 
            value={"AI/ML"}
            onChange={toggleCategory}
            className="accent-black w-4 h-4 rounded-md"/> AI/ML
          </label>

          <label htmlFor="science" className="text-white flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
            <input 
            type="checkbox" 
            id="science" 
            value={"Data Science"}
            onChange={toggleCategory}
            className="accent-black w-4 h-4 rounded-md"/> Data Science
          </label>

          <label htmlFor="Analytics" className="text-white flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
            <input 
            type="checkbox" 
            id="Analytics"
            value={"Data Analytics"}
            onChange={toggleCategory} 
            className="accent-black w-4 h-4 rounded-md"/> Data Analytics
          </label>

          <label htmlFor="tool" className="text-white flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
            <input 
            type="checkbox" 
            id="tool" 
            value={"AI Tools"}
            onChange={toggleCategory}
            className="accent-black w-4 h-4 rounded-md"/> AI Tools
          </label>

          <label htmlFor="other" className="text-white flex items-center gap-3 cursor-pointer hover:text-gray-200 transition">
            <input 
            type="checkbox" 
            id="other" 
            value={"Others"}
            onChange={toggleCategory}
            className="accent-black w-4 h-4 rounded-md"/> Others
          </label>

        </form>
      </aside>

      <main onClick={()=>setIsSidebarShow(false)} className="w-full transition-all duration-300 py-[120px] md:pl-[290px] flex items-center justify-center md:justify-start flex-wrap gap-6 px-[10px]">
        {
          filterCourses.map((course)=>(
            <Card key={course._id} thumbnail={course.thumbnail} title={course.title} category={course.category} price={course.price} id={course._id} reviews={course.reviews}/>
          ))
        }
      </main>
    
    </div>
  )
}

export default AllCourses