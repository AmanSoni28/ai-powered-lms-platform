// <--------------------------notes : nodemailer----------------------->
//Backend setup

// https://nodemailer.com/
// youTube video: https:https://www.youtube.com/watch?v=p2w96Fq4d1U&t=18579s (time:4:22)

// 📧 What is Nodemailer?
// “Nodemailer is a Node.js library used to send emails from the backend using SMTP services like Gmail. It is commonly used for OTP verification, password reset, and notifications.”

// 1️⃣ Install Nodemailer
// npm install nodemailer

// 2️⃣ Create .env file (IMPORTANT)

// Use Gmail App Password (not normal password)

// EMAIL_USER=yourgmail@gmail.com
// EMAIL_PASS=your_app_password


// 🔐 How to get App Password

// Google Account → Security

// Enable 2-Step Verification

// App Passwords → Select Mail → Generate

// Copy password (16 chars)

// 3️⃣ Nodemailer Config (config/mail.js)
// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export default transporter;


// ✅ Industry practice: transporter in separate config file

// 4️⃣ Send OTP Email Utility (utils/sendOtpMail.js)
// import transporter from "../config/mail.js";

// const sendOtpMail = async (email, otp) => {
//   const mailOptions = {
//     from: `"Support Team" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "Password Reset OTP",
//     html: `
//       <div style="font-family: Arial">
//         <h2>Password Reset Request</h2>
//         <p>Your OTP is:</p>
//         <h1>${otp}</h1>
//         <p>This OTP is valid for 10 minutes.</p>
//       </div>
//     `,
//   };

//   await transporter.sendMail(mailOptions);
// };

// export default sendOtpMail;

// 5️⃣ OTP Generate Function
// const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

// 6️⃣ Forgot Password Controller
// import User from "../models/user.model.js";
// import sendOtpMail from "../utils/sendOtpMail.js";

// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "Email not registered" });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000);

//     user.resetOtp = otp;
//     user.otpExpire = Date.now() + 10 * 60 * 1000; // 10 min
//     await user.save();

//     await sendOtpMail(email, otp);

//     res.status(200).json({ message: "OTP sent to email" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// 7️⃣ User Model Fields
// resetOtp: Number,
// otpExpire: Date,




// <-----------------Google Authentication----------------------------------->
//Frontend setup

// Firebase: https://console.firebase.google.com/
// Youtube:https://www.youtube.com/watch?v=p2w96Fq4d1U&t=18579s (time 5:10)

// ✅ BEST & SIMPLE WAY: Google Login using Firebase (Frontend) + Backend JWT

// This is most common for MERN projects and production-ready.

// 🔹 STEP 1: Create Firebase Project
// Go to 👉 https://console.firebase.google.com
// Add Project → Give name → Continue
// After project created → Authentication
// Click Sign-in method
// Enable Google
// Save

// 🔹 STEP 2: Get Firebase Config

// Project Settings ⚙️
// Add Web App
// Copy this:

// const firebaseConfig = {
//   apiKey: "...",
//   authDomain: "...",
//   projectId: "...",
//   appId: "..."
// };

// 🔹 STEP 3: Install Firebase in React
// npm install firebase

// 🔹 STEP 4: Firebase Setup File

// 📁 src/firebase.js

// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "YOUR_KEY",
//   authDomain: "YOUR_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   appId: "YOUR_APP_ID",
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();

// 🔹 STEP 5: Google Login Button Logic (React)

// 📁 Login.jsx

// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../firebase";
// import axios from "axios";

// const handleGoogleLogin = async () => {
//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     const user = result.user;

//     // send data to backend
//     const res = await axios.post(
//       "http://localhost:5000/api/auth/google",
//       {
//         name: user.displayName,
//         email: user.email,
//         avatar: user.photoURL,
//       },
//       { withCredentials: true }
//     );

//     console.log(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// 🔹 STEP 6: Button JSX
// <button
//   onClick={handleGoogleLogin}
//   className="border px-4 py-2 rounded w-full"
// >
//   Continue with Google
// </button>

// 🔹 STEP 7: Backend Route (Node + Express)

// 📁 routes/auth.js

// router.post("/google", async (req, res) => {
//   const { name, email, avatar } = req.body;

//   let user = await User.findOne({ email });

//   if (!user) {
//     user = await User.create({
//       name,
//       email,
//       avatar,
//       password: "GOOGLE_AUTH",
//     });
//   }

//   const token = jwt.sign(
//     { userId: user._id },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//   );

//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//   });

//   res.json({ success: true, user });
// });

// <----------------------------------------------------------->
// object-cover is used to scale an image or video so that it completely covers its container while maintaining its aspect ratio.

// object-cover kya karta hai?
// Image ko container ke full area me fill karta hai
// Aspect ratio maintain rakhta hai
// Extra part crop ho jata hai (zoom jaisa)

// object-fill is used when we need the image to exactly fit the container dimensions even if it distorts the image.

// 👉 Exactly jaise background-size: cover
// | Class            | Kya karta hai          |
// | ---------------- | ---------------------- |
// | `object-cover`   | Best default, clean UI |
// | `object-contain` | Full image dikhe       |
// | `object-fill`    | Stretch karta hai      |
// | `object-none`    | Original size          |

// <-------------------------------------------------------------------->
// agr kisi page me useEffect use krte h to jb bhi hm us page ko open krenge useEffect hr bar run hoga chahe dependency kuch bhi ho kyuki jb page open krte h to useEffect 'MOUNT' hota h and hr bar 'MOUNT' hone pr useEffect run hota h
//but agr usi page pr h then agr page re-render hota h to useEffect dependency ke according run hoga, agr dependency change useEffect run otherwise not change

// <------------------------------------------------------------------->
// when we call MongoDB (Mongoose) QUERY METHOD then MongoDB return:
// | Method                | Return Type                  |
// | --------------------- | ---------------------------- |
// | `find()`              | **Array** ✅                 |
// | `findOne()`           | **Object ya null**           |
// | `findById()`          | **Object ya null**           |
// | `create()`            | **Object**                   |
// | `findByIdAndUpdate()` | **Object (updated) ya null** |
// | `findByIdAndDelete()` | **Object ya null**           |

// <------------------------------find in js-------------------------------------------->
// for update redux 
// use spred [...old,new]
// not use old.push(new)

// <------------------------------------------------------->
// 🔍 find() kya karta hai?

// find() array ke andar se pehla element return karta hai
// 👉 jo given condition ko satisfy kare

// Agar koi element match na kare → undefined return hota hai

// 🧠 Syntax
// array.find((element, index, array) => {
//   return condition
// })

// ✅ Basic example
// const numbers = [10, 20, 30, 40]

// const result = numbers.find(num => num > 25)

// console.log(result) // 30


// ➡️ 30 pehla number hai jo > 25 hai

// ❌ Agar kuch na mile
// const nums = [1, 2, 3]

// const res = nums.find(n => n > 10)

// console.log(res) // undefined

// <----------------------------Razorpay--------------------->
//Backend setup
//npm : https://www.npmjs.com/package/razorpay
//https://www.youtube.com/watch?v=Pp-weTKly98        (time 3:10)
//write code in 'order.controller.js' 

//frontend setup
//<script src="https://checkout.razorpay.com/v1/checkout.js"></script>,                     write this in index.html 


//write code in '/pages/ViewCourses.jsx'

// <----------------------Chart : rechart------------------------->
//frontend
//npm : https://www.npmjs.com/package/recharts
//https://www.youtube.com/watch?v=Pp-weTKly98        (time 5:20)
//wright code in 'Dashboard.jsx'

//<-----------------AI integrate--------------->
//https://www.youtube.com/watch?v=Pp-weTKly98        (time 7:42)

// backend
//npm install @google/genai
//https://ai.google.dev/gemini-api/docs        (website)
//write code in 'search.controller'