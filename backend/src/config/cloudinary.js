import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import dotenv from 'dotenv'  
dotenv.config({path: './.env'}); 

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
 });


 //using multer user uploaded file save in local server and here take the localFilePath from local server and upload on clodinary
 const uploadOnCloudinary = async (localFilePath)=>{
    // console.log(localFilePath);
    
    try {
        if(!localFilePath)  return null;
        
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{ 
            resource_type: "auto",                                                   //automatic detect file type(image,vedio,pdf)
            folder : "LMS"
         })                                                 

        //file has been upload successfull
        // console.log("file is upload on cloudinary", response.url)               
        fs.unlinkSync(localFilePath);                                       //remove the save file from local server(from public/temp folder)
        return response.url;

    } catch (error) {
        fs.unlinkSync(localFilePath);                           //remove the save file from local server(from public/temp folder)
        console.log(error);
        return null;
    }
 }

 export {uploadOnCloudinary}


  