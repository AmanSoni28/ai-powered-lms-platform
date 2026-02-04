import { Router } from "express";
const paymentRouter = Router()

import isAuth from "../middleware/isAuth.js";
import { createRazorpayOrder, verifyPayment } from "../controllers/order.controller.js";


paymentRouter.post('/razorpay-order', isAuth, createRazorpayOrder)
paymentRouter.post('/verifypayment', isAuth, verifyPayment)

export default paymentRouter