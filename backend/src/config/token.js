import jwt from 'jsonwebtoken'

const getToken = async (userId)=>{
  try {
    return jwt.sign(
    { userId: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
      )
  } catch (error) {
    console.log("cookie error:",error);
  }
}

export default getToken;
