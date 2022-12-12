
import { Link } from "../models/Link.js"
import {nanoid} from "nanoid"

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

export const getLink = async (req,res) => {
    try {
        const {id} = req.params
        const link = await Link.findById(id)
        if(!link) return res.status(404).json({error: 'Link does not exist'})

        if(!link.uid.equals(req.uid)) return res.status(401).json({error: 'Restricted Link '})
        return res.json({link})
    } catch (error) {
        console.log(error)
        if(error.kind === "objectId"){
            return res.status(403).json({error: "Format id it is incorrect"})
        }
        return res.status(500).json({error: "Internal server error"})
    }
}

export const createLinks = async(req,res) => {
    try {
        let {originLink} = req.body
        if(!originLink.startsWith("https://")){
            originLink = "https://" + originLink
        }
        const link = new Link({originLink,nanoLink: nanoid(10), uid: req.uid})
        
        const newLink = await link.save()

        return res.status(201).json({newLink})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
}

export const removeLink = async (req,res) => {
    try {
        const {id} = req.params
        const link = await Link.findById(id)
        if(!link) return res.status(404).json({error: 'Link does not exist'})

        if(!link.uid.equals(req.uid)) return res.status(401).json({error: 'Restricted Link '})

        await link.remove()
        
        return res.json({link})
    } catch (error) {
        console.log(error)
        if(error.kind === "objectId"){
            return res.status(403).json({error: "Format id it is incorrect"})
        }
        return res.status(500).json({error: "Internal server error"})
    }
}