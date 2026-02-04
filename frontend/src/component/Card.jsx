import { FaStar } from "react-icons/fa6";
import emptyCourseImg from '/LMS_emptyCourse.png'
import { useNavigate } from "react-router-dom";

const Card = ({thumbnail, title, category , price, id, reviews}) => {        //id is course id
  const navigate=useNavigate()

  const calculateAvgRaview = (reviews)=>{
  if(!reviews || reviews.length === 0 ) return 0

  const total = reviews.reduce((sum, review)=> sum+review.rating, 0)

  return (total/reviews.length).toFixed(1)
}

const avgRating = calculateAvgRaview(reviews)

  return (
    <div className="max-w-[290px] w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-105  transition-all duration-300 border border-gray-300 mb-6 cursor-pointer" onClick={()=>navigate(`/viewcourse/${id}`)}>
      <img src={thumbnail || emptyCourseImg} alt="thumbnail" className="w-full h-48 object-cover"/>
      <div className="p-5 space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <span className="px-2 py-0.5 bg-gray-100 rounded-full text-gray-700 capitalize">{category}</span>       

        <div className="flex justify-between text-sm text-gray-600 mt-3 px-[10px]">
            <span className="font-semibold text-gray-800">₹ {price || "Free"}</span>
            <span className="flex items-center gap-1"><FaStar className="fill-yellow-400"/>{avgRating}</span>
        </div>         
      </div>
    </div>            
  )
}

export default Card