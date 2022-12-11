import {Router} from "express";
import {infoUser, login, register, refreshToken, logout} from '../controllers/auth.controller.js'
import {body} from 'express-validator'
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatorManager.js";
const router = Router()

router.post('/register',
bodyRegisterValidator,
register
);
router.post('/login',
bodyLoginValidator,
login
);
//no funciona
router.get('/protected',requireAuth, infoUser)
router.get('/refresh', refreshToken)
router.get('/logout', logout)


export default router; 