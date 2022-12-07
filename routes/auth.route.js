import {Router} from "express";
import {login, register} from '../controllers/auth.controller.js'
import {body} from 'express-validator'
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
const router = Router()

router.post('/register',[
    body('email','Email format it is incorrect').trim().isEmail().normalizeEmail(),
    body('password', 'Password min 6 characters').trim().isLength({min:6})
],
validationResultExpress,
register
);
router.post('/login',[
    body('email','Email format it is incorrect').trim().isEmail().normalizeEmail(),
    body('password', 'Password min 6 characters').trim().isLength({min:6})
],validationResultExpress, 
login
);



export default router; 