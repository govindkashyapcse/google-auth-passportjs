import express from "express"
import passport from "passport"
import {generateToken, verifyToken} from "../config/jwt"


export const authRouter = express.Router()
authRouter.get('/google', passport.authenticate('google',{scope: ['profile','email']}))
authRouter.get('/google/callback', passport.authenticate('google',{session: false, failureRedirect: '/'}),
    (req,res)=>{
        const token = generateToken(req.user)
        res.redirect(`/auth-success?token=${token}`)
    }
)

