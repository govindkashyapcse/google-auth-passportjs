import passport from "passport"
import { User } from "../../shared/models/user"
import dotenv from "dotenv"
const GoogleStrategy = require('passport-google-oauth20').Strategy
dotenv.config()


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
    callbackURL: '/auth/google/callback',
    scope: ['profile','email']
} ,async (accessToken:any, refreshToken:any, profile:any, done:any) => {

    let user = await User.findOne({providerId: profile.id, provider: 'google'})

    if(!user){
        user = await User.create({
            provider: 'google',
            providerId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value
        })
    }

    done(null,user)
    
}))

passport.serializeUser( (user, done)=> done(null, user))
passport.deserializeUser( (user, done)=> done(null, false))

export default passport