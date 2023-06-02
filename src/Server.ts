import { array } from "joi";

const Joi = require('joi')
const express = require('express')
const app = express()
const multer  = require('multer')

const {authorize} = require("./middleware/authorize.js")
require("./passport.js")
require('dotenv').config()


const {signup, login, logout} = require("./controllers/user")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})


require('dotenv').config()

app.use(express.json());

app.post("/user/signup", signup)
app.post("/user/login", login)
app.get("/user/logout", authorize, logout)

app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`)
})

