import { Course } from "../models/course.model.js"
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })


const searchWithAi= async(req,res)=>{
try{
  const {input}=req.body
  if(!input){
    return res.status(400).json({message:"Search query is required"})
  }
  
  const courses =await Course.find({
    isPublished:true,
    $or:[
        {title : {$regex : input, $options : 'i'}},
        {subTitle : {$regex : input, $options : 'i'}},
        {description : {$regex : input, $options : 'i'}},
        {category : {$regex : input, $options : 'i'}},
        {level : {$regex : input, $options : 'i'}}
    ]
  })
 
  if(courses.length > 0){                                     //if direct find course mathch with 'input' text
    return res.status(200).json(courses)
  }                 
  else{                                                       //otherwise find course according to 'keyword' generate by AI 
     
    const ai = new GoogleGenAI({                                        
    apiKey : process.env.GEMINI_API_KEY
    });

    const prompt = `You are an intelligent assistant for an LMS platform. A user will type any query about what they want to learn.
    Your task is to understand the intent and return one *most relevant keyword* from the following list of course categories and levels:

    - App Development
    - AI/ML
    - AI Tools
    - Data Science
    - Data Analytics
    - Ethical Hacking
    - UI UX Designing
    - Web Development
    - Others

    - Beginner
    - Intermediate
    - Advanced

     Only reply with one single keyword from the list above that best matches the query.
     Do not explain anything. No extra text.

     Query: ${input}                                         //find keyword according to 'input' text
     `;


    const response = await ai.models.generateContent({              //generate Ai content 
      model: "gemini-3-flash-preview",
      contents: prompt,                                          
    });

    // console.log(response);
  
    const keyword = response.text
    // console.log(keyword);

    const courses =await Course.find({          
    isPublished:true,
    $or:[
        {title : {$regex : keyword, $options : 'i'}},
        {subTitle : {$regex : keyword, $options : 'i'}},
        {description : {$regex : keyword, $options : 'i'}},
        {category : {$regex : keyword, $options : 'i'}},
        {level : {$regex : keyword, $options : 'i'}}
     ]
    })  
    return res.status(200).json(courses)           
    }
  
}catch(error){
  return res.status(500).json({message:`searchWithAi :${error}`})
}
}

export {searchWithAi}






// <-----------------------Notes---------------------->
//input' comes from frontend is totaly match then return result otherwise AI generate a keyword on basis of 'input' and search in database
//note: if Ai not work then change the API key from 'https://aistudio.google.com/api-keys'