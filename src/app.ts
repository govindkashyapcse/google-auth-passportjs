import express from 'express'
import mongoose from 'mongoose'
import passport from "./api/config/passport"
import dotenv from "dotenv"
import { authRouter } from './api/auth/auth.routes'

dotenv.config()
const app = express()

mongoose.connect(process.env.MONGO_URI as string)
    .then(()=> console.log("MongoDb Connected!"))
    .catch(err => console.log(err))

app.use(passport.initialize())

app.get('/', (req,res)=>{
    res.send('<a href="/auth/google/callback">Google Auth</a>')
})

app.use('/auth', authRouter)

app.get('/auth-success', (req,res) => {
    res.send("You have been logged in successfuly!")
})

app.listen(5173,()=>{
    console.log("Server Started!")
})