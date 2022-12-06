import {Schema,model} from 'mongoose'
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true, 
        index: {unique: true},
    },
    password:{
        type: String, 
        required: true
    } 
})

export const User = model('user', userSchema)