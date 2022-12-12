import {Router} from "express";
import { createLinks, getLinks, getLink, removeLink, updateLink } from "../controllers/link.controller.js";
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
router.get('/:nanoLink', getLink)
router.post('/',requireAuth,bodyLinkValidator, createLinks)
router.delete('/:id',requireAuth,paramsLinkValidator, removeLink)
router.patch('/:id',requireAuth,paramsLinkValidator,bodyLinkValidator, updateLink)

export default router;