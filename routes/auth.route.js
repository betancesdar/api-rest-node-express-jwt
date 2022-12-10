import {Router} from "express";
import {infoUser, login, register, refreshToken, logout} from '../controllers/auth.controller.js'
import {body} from 'express-validator'
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { requireAuth } from "../middlewares/requireAuth.js";
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
//no funciona
router.get('/protected',requireAuth, infoUser)
router.get('/refresh', refreshToken)
router.get('/logout', logout)


export default router; 