import { FaGooglePlay } from "react-icons/fa6";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { SiUikit } from "react-icons/si";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { RiOpenaiFill } from "react-icons/ri";
import { FaDatabase } from "react-icons/fa";
import { SiSimpleanalytics } from "react-icons/si";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const ExploreCourses = () => {
  const navigate=useNavigate()
  return (
    <div className="w-[100vw] min-h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]">
        
        {/* left div / Upper div */}
      <div className="w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-start justify-center gap-1 mg:px-[40px] px-[20px] lg:mb-6">
        <span className="text-[35px]  font-semibold">Explore</span>
        <span className="text-[35px]  font-semibold">Our Courses</span>
        <p className="text-[17px] max-w-[500px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. In blanditiis tempora quia dolores vero explicabo quaerat dolore, fugiat, laboriosam, molestiae impedit dolor. Natus ipsam nulla dolores dicta sunt a totam.</p> 
        <button onClick={()=>navigate('/allcourses')}
        className="px-[20px] py-[10px] border-2 text-white bg-black border-white rounded-[10px] text-[18px] font-light flex gap-2 mt-[30px] flex justify-center items-center cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95 active:bg-gray-400">Explore Courses <FaGooglePlay className="size-6"/></button>            
      </div>
       
       {/* right div / Lower div */}
      <div className="w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px] bg-">
        <div className="w-[100px] h-[130px] font-bold text-[13px] text-gray-500 flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center">
            <TbDeviceDesktopAnalytics className="w-[60px] h-[60px] text-gray-500"/>
          </div>
          Web Dev
        </div>
        <div className="w-[100px] h-[130px] font-bold text-[13px] text-gray-500 flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[90px] bg-[#d2ece0] rounded-lg flex items-center justify-center">
            <SiUikit className="w-[50px] h-[50px]"/>
          </div>
          UI/UX Designing
        </div>
        <div className="w-[100px] h-[130px] font-bold text-[13px] text-gray-500 flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[90px] bg-[#eff1cb] rounded-lg flex items-center justify-center">
            <MdAppShortcut className="w-[60px] h-[60px] "/>
          </div>
          App Dev
        </div>
        <div className="w-[100px] h-[130px] font-bold text-[13px] text-gray-500 flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[90px] bg-[#c6e7ec] rounded-lg flex items-center justify-center">
            <FaHackerrank className="w-[50px] h-[50px]"/>
          </div>
          Ethical Hacking
        </div>
        <div className="w-[100px] h-[130px] font-bold text-[13px] text-gray-500 flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[90px] bg-[#f1dcd5] rounded-lg flex items-center justify-center">
            <RiOpenaiFill className="w-[60px] h-[60px]"/>
          </div>
          AI/ML                  
        </div>
        <div className="w-[100px] h-[130px] font-bold text-[13px] text-gray-500 flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[90px] bg-[#eebebe] rounded-lg flex items-center justify-center">
            <FaDatabase className="w-[50px] h-[50px]"/>
          </div>
           Data Science
        </div>
        <div className="w-[100px] h-[130px] font-bold text-[13px] text-gray-500 flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[90px] bg-[#bacbf0] rounded-lg flex items-center justify-center">
            <SiSimpleanalytics className="w-[40px] h-[40px]"/>
          </div>
          Data Analytics
        </div>
        <div className="w-[100px] h-[130px] font-bold text-[13px] text-gray-500 flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[90px] bg-[#c8e5c2] rounded-lg flex items-center justify-center">
            <SiOpenaigym className="w-[50px] h-[50px]"/>
          </div>
          AI Tools
        </div>
      </div>
    </div>
  )
}

export default ExploreCourses