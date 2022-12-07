import { User } from "../models/User.js"

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
    }
    
}

export const login = async (req,res)=> {
    res.json({"message": "We are in login"})
}
