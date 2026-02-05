import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,     // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const sendOtpMail = async (email, otp) => {
  const mailOptions = {
    from: `"Virtual Courses" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <div style="font-family: Arial">
        <h2>Password Reset Request</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendOtpMail









// <--------------------------notes:----------------------->
// https://nodemailer.com/

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


