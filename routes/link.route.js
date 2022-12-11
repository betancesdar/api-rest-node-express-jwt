import {Router} from "express";
import { createLinks, getLinks } from "../controllers/link.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = Router()

//GET /api/v1/links allLinks
//GET /api/v1/links/:id single link
//POST /api/v1/links/ Create link
//path /api/v1/links/:id update why path instead put it allow me to update only 
//GET /api/v1/links/:id


//test route
router.get('/', requireAuth, getLinks)
router.post('/',requireAuth, createLinks)

export default router;