import {validationResult, body, param} from 'express-validator'
import axios from 'axios'

export const validationResultExpress = (req,res,next) => {
const errors = validationResult(req)

if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() });
}

 next()

};

export const paramsLinkValidator = [
    param("id","Not valid format (ex)").trim().notEmpty().escape(),
    validationResultExpress
]

export const bodyLinkValidator = [
    body('originLink','Link Format incorrect').trim().notEmpty()
    .custom(async (value) =>{
        try {
            //solucion por si el usuario se le olvida poner el https
            if(!value.startsWith("https://")){
                value = "https://" + value
            }
            await axios.get(value)
            return value
        } catch (error) {
            console.log(error)
            throw new Error("Not found 404")
        }
    }),
    validationResultExpress
]

export const bodyRegisterValidator = [
    body('email','Email format it is incorrect').trim().isEmail().normalizeEmail(),
    body('password', 'Password min 6 characters').trim().isLength({min:6}),
    validationResultExpress
]

export const bodyLoginValidator = [
    body('email','Email format it is incorrect').trim().isEmail().normalizeEmail(),
    body('password', 'Password min 6 characters').trim().isLength({min:6}),
    validationResultExpress
]