
const passport = require("passport")

const passportJWT = require("passport-jwt")
const {db} = require("./controllers/user.js")

require('dotenv').config()

const {SECRET} = process.env

passport.use(
    new passportJWT.Strategy(
        {
            secretOrKey: SECRET,
            jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (payload, done) =>{
            const user = await db.one(`SELECT * FROM users WHERE id=$1`, payload.id)
            console.log(user)

            try {
                return user ? done(null, user) : done(new Error("User not found")) 
            } catch (error) {
                done(error)
            }
        })
    )