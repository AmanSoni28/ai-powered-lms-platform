import { Router } from "express";
import { getCurrentUser, updateProfile } from "../controllers/user.controller.js";
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.middleware.js";

const userRouter = Router()

userRouter.get('/current-user', isAuth, getCurrentUser)
userRouter.patch('/update-profile', isAuth, upload.single("photoUrl"), updateProfile)

export default userRouter;  