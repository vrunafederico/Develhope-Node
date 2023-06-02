import { array } from "joi";

const Joi = require('joi')
const express = require('express')
const app = express()
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})


const pgPromise = require("pg-promise")

const db = pgPromise()({
    host:'127.0.0.1',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'aS2MKXpy3k'
  })

require('dotenv').config()

app.use(express.json());

app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`)
})

module.exports= {
  db
}