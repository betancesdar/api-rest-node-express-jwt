
import { Link } from "../models/Link.js"

export const getLinks = async (req,res) => {
    try {
        //como en la ruta le puse antes el requireAuth puedo traer el uid del usuario
        const links = await Link.find({uid: req.uid })
        
        return res.json({links})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
    
}

export const createLinks = async(req,res) => {
    try {
        const {originLink} = req.body
        return res.json({originLink})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
}