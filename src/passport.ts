import { createSecretKey } from "crypto"

require('dotenv').config()
const passport = require("passport")

const passportJWT = require("passport-jwt")
const {db} = require("./Server.js")


passport.use(new passportJWT.Strategy({
        secreatOrKey: process.env.SECRET,
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (payload, done) =>{
        const user = await db.one(`SELECT * FROM user WHERE id=$1`, payload.id)
        console.log(user)

        try {
            return user ? done(null, user) : done(new Error("User not found")) 
        } catch (error) {
            done(error)
        }
    })
)