import mongoose from 'mongoose'

try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log("Connect to the DB 🔥")
} catch (error) {
    console.log("Error connecting to the DB 😥: " + error)
}
