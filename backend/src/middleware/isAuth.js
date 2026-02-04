import jwt from 'jsonwebtoken'

const isAuth = async (req, res, next)=>{
    try {
        const {token} = req.cookies
        if(!token){
            return res.status(401).json({message:`Unauthorized request`}) 
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        if(!decodedToken){
            return res.status(401).json({message:`Invalid Token`})
        }

        req.userId=decodedToken.userId
        next()
    } catch (error) {
        return res.status(401).json({message:`isAuth error :${error}`})
    }
}

export default isAuth