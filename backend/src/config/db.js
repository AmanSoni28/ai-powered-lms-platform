import mongoose from 'mongoose'

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("DB connect");
    } catch (error) {
        console.log(error);
        process.exit(1);   
    }
}


export default connectDb