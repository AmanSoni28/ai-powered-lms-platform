import ExploreCourses from "../component/ExploreCourses.jsx";
import Logos from "../component/Logos.jsx";
import Nav from "../component/Nav.jsx";
import { FaGooglePlay } from "react-icons/fa6";
import CardPage from "../component/CardPage.jsx";
import { useNavigate } from "react-router-dom";
import About from "../component/About.jsx";
import Footer from "../component/Footer.jsx";
import ReviewPage from "../component/ReviewPage.jsx";


const Home = () => {
  const navigate=useNavigate()
  return (
    <div className="w-[100%] overflow-hidden">
      <div className="w-[100%] lg:h-[140vh] h-[70vh] relative">
        <Nav/>
        <img src="/LMS_home.png" alt="home_bg" className="object-cover w-[100%] lg:h-[100%] h-[50vh] md:object-fill "/>
        <span className="absolute text-[20px] lg:text-[70px] md:[40px] lg:top-[8%] top-[15%] w-[100%] flex items-center justify-center text-white font-bold  ">Grow Your Skills to Advance</span>
        <span className="absolute text-[20px] lg:text-[70px] md:[40px] lg:top-[16%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold  ">Your Career Path</span>

        <div className="absolute lg:top-[27%] top-[75%] md:top-[80%] w-[100%] flex justify-center items-center gap-3 flex-wrap px-2">
          <button onClick={()=>navigate('/allcourses')}
          className="bg-black font-bold text-white lg:px-6 lg:py-3 px-4 py-2 text-[18px] border-2 
          rounded-full hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2">View All Courses<FaGooglePlay className="size-6"/></button>
          <button className="bg-white font-bold text-black lg:px-6 lg:py-3 px-4 py-2 text-[18px] border-2 border-black rounded-full hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-1" onClick={()=>navigate('/search')}>
            Search with Ai
            <img src="/LMS_AI_HOME.png" alt="app_store" className="h-[30px] "/>
            </button>  
        </div>
      </div>
      <Logos />
      <ExploreCourses/>
      <CardPage/>
      <About/>
      <ReviewPage/>
      <Footer/>
    </div>
  );
};

export default Home;





