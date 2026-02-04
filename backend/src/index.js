import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
dotenv.config({ path: './.env' })
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app=express()

const port=process.env.PORT || 8000

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))                      
app.use(express.urlencoded({limit:"16kb", extended:true}))    
app.use(express.static("public"))                     
app.use(cookieParser()) 

import authRouter from './routers/auth.router.js'
app.use('/api/auth', authRouter)

import userRouter from './routers/user.router.js'
app.use('/api/user', userRouter)

import courseRouter from './routers/course.router.js'
app.use('/api/course', courseRouter)

import paymentRouter from './routers/payment.router.js'
app.use('/api/order',paymentRouter)

import reviewRouter from './routers/review.router.js'
app.use('/api/review', reviewRouter)

app.listen(port,()=>{
    connectDb()
    console.log(`listen at port ${port}` );
})
