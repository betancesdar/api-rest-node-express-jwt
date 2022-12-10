import jwt from "jsonwebtoken"

export const requireAuth = (req,res,next) => {
    try {   
        let token = req.headers?.authorization;
        console.log(token)
        if(!token) throw new Error('No token exist in the headers')
        //verify with jwt 
        token = token.split(' ')[1]
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error.message)
        const TokenVerificationErrors = {
            ["invalid signature"]: "The signature of the JWT it is not valid",
            ["jwt expired"]: "Json Web Token Expired",
            ["invalid token"]: "Token not valid",
            ["No Bearer"]: "Please use the Bearer Format!",
            ["jwt malformed"]: "JWT it is malformed"
        }
        return res
        .status(401)
        .send({error: TokenVerificationErrors[error.message]})
    }
}