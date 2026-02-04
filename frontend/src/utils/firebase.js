// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginvirtualcourses-e4005.firebaseapp.com",
  projectId: "loginvirtualcourses-e4005",
  storageBucket: "loginvirtualcourses-e4005.firebasestorage.app",
  messagingSenderId: "885335192574",
  appId: "1:885335192574:web:9cfd4d027402145181c6af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };

