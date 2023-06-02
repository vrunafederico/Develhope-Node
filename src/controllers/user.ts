import Joi from "joi"
import { PassThrough } from "stream"
const JWT = require("jsonwebtoken")
require('dotenv').config()

const pgPromise = require("pg-promise")

const db = pgPromise()({
  host:'127.0.0.1',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'aS2MKXpy3k'
})


const createTable = async ()=>{
  await db.none(`
      DROP TABLE IF EXISTS users;

      CREATE TABLE users (
          id SERIAL NOT NULL PRIMARY KEY,
          username TEXT NOT NULL,
          password TEXT NOT NULL,
          token TEXT
      );`
  )
}

createTable()

const signup = async (req, res) =>{
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    })

    try {
        const data = schema.validate(req.body)
        if(data.error){
            res.status(400).json({msg: "User not valide"})
            return 
        } 

        const user = await db.one(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`, [data.value.username, data.value.password])

        res.status(200).json({msg: "Signup successful. Now you can log in."})

    } catch (error) {
        res.status(400).json({msg: "User not valide"})
    }
}

const login = async (req, res) =>{
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    })

    try {
        const data = schema.validate(req.body)

        if(data.error){
            res.status(400).json({msg: "User not valide"})
            return 
        } 

        const user = await db.one(`SELECT * FROM users WHERE username=$1`, [data.value.username])

        if(!user){
            res.status(401).json({msg: "User not found"})
            return
        }

        if(data.value.password !== user.password){
            res.status(402).json({msg: "User not found"})
            return
        }

        const payload = {
            id: user.id,
            username: user.username
        }

        const token = JWT.sign(payload, process.env.SECRET)
        const update = await db.one(`UPDATE users SET token=$2 WHERE username=$1 RETURNING *`, [data.value.username, token])
        res.status(200).json({token})


    } catch (error) {
        res.status(400).json({msg: "User not found"})
    }
}


const logout = async (req,res) =>{
    const user = req.user
    const update = await db.one(`UPDATE users SET token=$2 WHERE id=$1 RETURNING *`, [user.id, null])
    res.status(200).json({msg: "logout"})
}

module.exports = {
    db,
    signup,
    login,
    logout
}