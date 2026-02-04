import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import LogIn from './pages/LogIn.jsx'
import Home from './pages/Home.jsx'
import { ToastContainer } from "react-toastify";
import getCurrentUser from './customHooks/getCurrentUser.js'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile.jsx'
import { Navigate } from 'react-router-dom';
import ForgetPassword from './pages/ForgotPassword.jsx'
import EditProfile from './pages/EditProfile.jsx'
import Dashboard from './pages/Educator/Dashboard.jsx'
import Courses from './pages/Educator/Courses.jsx'
import CreateCourse from './pages/Educator/CreateCourse.jsx'
import getCreatorCourses from './customHooks/getCreatorCourses.js'
import EditCourse from './pages/Educator/EditCourse.jsx'
import getPublishedCourses from './customHooks/gatPublishedCourses.js'
import AllCourses from './pages/AllCourses.jsx'
import CreateLecture from './pages/Educator/createLecture.jsx'
import EditLecture from './pages/Educator/EditLecture.jsx'
import ViewCourse from './pages/ViewCourse.jsx'
import ScrollToTop from './component/ScrollToTop.jsx'
import ViewLectures from './pages/ViewLectures.jsx'
import MyEnrolledCourses from './pages/MyEnrolledCourses.jsx'
import getAllReviews from './customHooks/getAllReviews.js'
import SearchWithAi from './pages/SearchWithAi.jsx'


function App() {
  
  getCurrentUser()
  getCreatorCourses()
  getPublishedCourses()
  getAllReviews()
  const {userData} = useSelector((state)=>state.user)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={!userData ? <SignUp/> : <Navigate to='/' />}  />
        <Route path='/login' element={!userData ? <LogIn/> : <Navigate to='/' />}  />
        <Route path='/profile' element={userData ? <Profile/> : <Navigate to='/SignUp'/>} />
        <Route path='/forgot-password' element={!userData ? <ForgetPassword/> : <Navigate to='/' /> } />
        <Route path='/edit-profile' element={userData ? <EditProfile/> : <Navigate to='/SignUp'/> } />
        <Route path='/dashboard' element={userData?.role==="educator" ? <Dashboard/> : <Navigate to='/SignUp'/> } />
        <Route path='/courses' element={userData?.role==="educator" ? <Courses/> : <Navigate to='/SignUp'/> } />
        <Route path='/createcourse' element={userData?.role==="educator" ? <CreateCourse/> : <Navigate to='/SignUp'/> } />
        <Route path='/editcourse/:courseId' element={userData?.role==="educator" ? <EditCourse/> : <Navigate to='/SignUp'/> } />
        <Route path='/allcourses' element={userData ? <AllCourses/> : <Navigate to='/SignUp'/> } />
        <Route path='/createlecture/:courseId' element={userData?.role==="educator" ? <CreateLecture/> : <Navigate to='/SignUp'/> } />
        <Route path='/editlecture/:courseId/:lectureId' element={userData?.role==="educator" ? <EditLecture/> : <Navigate to='/SignUp'/> } />
        <Route path='/viewcourse/:courseId' element={userData ? <ViewCourse/> : <Navigate to='/SignUp'/> } />
        {/* <Route path='/viewlectures/:courseId' element={userData ? <ViewLectures/> : <Navigate to='/SignUp'/> } /> */}
        <Route path='/viewlectures' element={userData ? <ViewLectures/> : <Navigate to='/SignUp'/> } />
        <Route path='/myenrolledcourses' element={userData ? <MyEnrolledCourses/> : <Navigate to='/SignUp'/> } />
        <Route path='/search' element={userData ? <SearchWithAi/> : <Navigate to='/SignUp'/> } />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      
       <ScrollToTop/>             {/*for scroll to top*/}
    </>
  )
}

export default App
