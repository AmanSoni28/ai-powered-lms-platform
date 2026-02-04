import { useSelector } from 'react-redux'
import Card from './Card.jsx'
import { useState } from 'react'
import { useEffect } from 'react'

const CardPage = () => {
    const {publishedCoursesData} = useSelector((state)=>state.course)
    const [popularCourses,setPopularCourses]=useState([])
    
    useEffect(()=>{
        setPopularCourses(publishedCoursesData?.slice(0,6))  //takes 6 published courses
    },[publishedCoursesData])


  return (
    <div className='relative flex items-center justify-center flex-col'>
      <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px]'>Our Popular Courses</h1>    
      <span className='lg:w-[50%] md:[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px]'>Explore top-reted courses designed to boost your skills, enhance careers, and unlock opportunities in tech AI, business, and beyond.</span>
      <div className='w-[100%] flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]'> 
      {
        popularCourses?.map((course)=>(
          <Card key={course._id} thumbnail={course.thumbnail} title={course.title} category={course.category} price={course.price} id={course._id} reviews={course.reviews}/>
        ))
      }
      </div>
    </div>  
  )
}

export default CardPage