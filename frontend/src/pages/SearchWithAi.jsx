import axios from "axios";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { RiMicAiFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { serverUrl } from "../main.jsx";
import start from '/LMS_mic_voice.wav'

const SearchWithAi = () => {
    const navigate=useNavigate()
    const [input,setInput]=useState("")
    const [recommendations,setRecommendations]=useState([])
    const [listening,setListening]=useState(false)

    const startSound=new Audio(start)

    function speak(message){
      const utterance= new SpeechSynthesisUtterance(message)        //convert text to voice
      window.speechSynthesis.speak(utterance)
    }
    

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition        //consvert voice to text 
    
    const recoginition = new SpeechRecognition()
     
    if(!recoginition){
        toast.error("Speech recognition not support")
    }

    const handleSearch = async ()=>{
        setListening(true)
        if(!recoginition) return 
        recoginition.start()               
        startSound.play()
        recoginition.onresult = async (e) =>{
        //   console.log(e);
        const transcript = e.results[0][0].transcript.trim()
        setInput(transcript)
        await handleRecommendation(transcript)
        }
    }

    const handleRecommendation = async (query)=>{
    try {
        const result=await axios.post(`${serverUrl}/api/course/search` , {input : query}, {withCredentials:true})
        console.log(result.data);
        setListening(false)
        setRecommendations(result.data)
        setInput("")
        if(result.data.length > 0){
          speak("These are the top courses I found for you")
        }else{
          speak("No courses found")
        }
    } catch (error) {
        toast(error.response.data.message)
        setListening(false)
    }
    }

  return (
    <div className='min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center px-4 py-1'>
      {/* search Container */}
      <div className='bg-white shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl text-center relative'>
        <FaArrowLeft className="text-black w-[22px] h-[22px] cursor-pointer absolute" onClick={()=>navigate('/')}/>
       <h1 className="text-2xl sm:text-3xl font-bold text-gray-600 mb-6 flex items-center justify-center gap-2">
         <img src='/LMS_AI_HOME.png' alt="" className="w-8 h-8 sm:w-[30px] sm:h-[30px]"/> Search with <span className="text-[#CB99C7]"> AI</span>
       </h1>

       <div className="flex items-center bg-gray-700 rounded-full overflow-hidden shadow-lg relative w-full">
         <input
          type="text"
          placeholder="What do you want to learn? (e.g. AI, MERN, Cloud...)"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          className="flex-grow px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base"
         />

         {input && <button className="absolute right-14 sm:right-16 bg-white rounded-full">
          <img src='/LMS_AI_HOME.png' alt="" className="w-10 h-10 p-2 rounded-full" onClick={()=>handleRecommendation(input)}/>
         </button>}

         <button className="absolute right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center" onClick={handleSearch}><RiMicAiFill size={20} className="text-[#c57fbf]" /></button>
       </div>
      </div>

      {recommendations?.length>0 ? (
        <div className="w-full max-w-6xl mt-12 px-2 sm:px-4">
        <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-white text-center">AI Search Results</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
            {
              recommendations?.map((course) => (
              <div key={course._id} className="bg-white text-black p-5 rounded-2xl shadow-md hover:shadow-indigo-500/30 transition-all duration-200 border border-gray-200 cursor-pointer hover:bg-gray-200" onClick={()=>navigate(`/viewcourse/${course._id}`)}>
                <h2 className="text-lg font-bold sm:text-xl">{course.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{course.category}</p>
              </div>
               ))
            }
          </div>
        </div>) : (listening ? <h1 className="text-center text-xl sm:text-2xl mt-10 text-gray-400">Listening ...</h1> : <h1 className="text-center text-xl sm:text-2xl mt-10 text-gray-400">No Courses Found Yet </h1>)
      }

    </div>
  )
}

export default SearchWithAi



// <---------------------Notes--------------------->
// 🔹 window.SpeechRecognition
// This is the standard voice-to-text API
// Converts speech → text
// Used by browsers that follow web standards

// 🔹 window.webkitSpeechRecognition
// This is Chrome’s version of the same API
// Chrome uses this instead of the standard one

// 🔹 Why we use both?
// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;


// 👉 Because:
// Some browsers support SpeechRecognition
// Chrome supports webkitSpeechRecognition
// Using both makes voice input work in more browsers

//note : here we only send text or change voice in text or change text to voice and take result from backend, AI not integrate here AI integrate in bac