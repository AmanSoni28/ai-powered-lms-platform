import { Router } from "express";
import { googleAuth, logIn, logOut, resetPassword, sendOtp, signUp, verifyOtp } from "../controllers/auth.controller.js";

const authRouter = Router()

authRouter.post('/signup', signUp)
authRouter.post('/login', logIn)
authRouter.get('/logout', logOut)

authRouter.post('/send-otp', sendOtp)
authRouter.post('/verify-otp', verifyOtp)
authRouter.post('/reset-password', resetPassword)

authRouter.post('/google-auth', googleAuth)

export default authRouter;