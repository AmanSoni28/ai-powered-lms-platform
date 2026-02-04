import { Router } from "express";
const reviewRouter = Router()

import isAuth from "../middleware/isAuth.js";
import { createReview, getReviews } from "../controllers/review.controller.js";

reviewRouter.post('/create-review', isAuth, createReview)
reviewRouter.get('/get-reviews', getReviews)

export default reviewRouter