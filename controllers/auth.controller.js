import { User } from "../models/User.js"
import jwt from "jsonwebtoken"
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req,res)=> {
    const {email,password} = req.body
    try {
        //Alternativa dos de validacion: 
        let user = await User.findOne({email})
        if(user) throw ({code: 11000});
        user = new User({email,password});
        await user.save();

        //jwt token

        return res.status(201).json({message:"Created"})
    } catch (error) {
     console.log(error);
     if(error.code === 11000){
        return res.status(400).json({error: "Duplicated user"})
     }
     
     return res.status(500).json({message: "Internal server error"})
    }
    
};

export const login = async (req,res)=> {
    try {
        const {email, password } = req.body;

        let user = await User.findOne({email}); 
        if(!user) return res.status(403).json({error: "this user does not exist"})
        
        const answerPassword = await user.comparePassword(password);
        if (!answerPassword){
            if(!user) return res.status(403).json({error: "incorrect password"})
        }

        //Generate token jwt 
        const {token, expiresIn} = generateToken(user.id)
        generateRefreshToken(user.id, res)
        return res.json({token, expiresIn});
    } catch(error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
       
}

export const infoUser = async (req,res) => {
    try {
        const user = await User.findById(req.uid).lean()
        return res.status(200).json({ email: user.email, uid: user.id })
    } catch (error) {
           return res.status(500).json({error: "Internal server error"})

    }
    
}

export const refreshToken = (req,res) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken
        if(!refreshTokenCookie) throw new Error("No token found")

        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
        const {token, expiresIn} = generateToken(uid)

        return res.json({token, expiresIn}); 

    } catch (error) {
        console.log(error)
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

export const logout = (req,res) => {
    res.clearCookie("refreshToken")
    res.json({ok:true})
}