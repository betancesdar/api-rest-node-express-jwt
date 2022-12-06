import {validationResult} from 'express-validator'

export const register = (req,res)=> {
    console.log(req.body)
    res.json({"message": "We are in registration"})
}

export const login = (req,res)=> {
    res.json({"message": "We are in login"})
}
