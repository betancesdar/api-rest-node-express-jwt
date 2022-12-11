import {validationResult, body} from 'express-validator'

export const validationResultExpress = (req,res,next) => {
const errors = validationResult(req)

if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() });
}

 next()

};

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