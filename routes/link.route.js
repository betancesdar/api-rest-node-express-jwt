import {Router} from "express";
import { createLinks, getLinks, getLink, removeLink } from "../controllers/link.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { bodyLinkValidator, paramsLinkValidator } from "../middlewares/validatorManager.js";

const router = Router()

//GET /api/v1/links allLinks
//GET /api/v1/links/:id single link
//POST /api/v1/links/ Create link
//path /api/v1/links/:id update why path instead put it allow me to update only 
//GET /api/v1/links/:id


//test route
router.get('/', requireAuth, getLinks)
router.get('/:id',requireAuth,paramsLinkValidator, getLink)
router.post('/',requireAuth,bodyLinkValidator, createLinks)
router.delete('/:id',requireAuth,paramsLinkValidator, removeLink)

export default router;