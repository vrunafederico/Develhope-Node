import { error } from "console"

const passport = require("passport")

const authorize = (req, res, next) =>{
    passport.authenticate("jwt", {session: false}, (err, user) =>{
        if(!user || err){
            res.status(400).json("Not Authorize")
        }else{
            req.user = user
            next()
        }
    })(req, res,next); 
} 

module.exports = {
    authorize
}