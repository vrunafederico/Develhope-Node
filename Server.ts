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

const upload = multer({ storage: storage })

const {getAll, getOneByID,create,updateByid,deleteByid, insertImage } = require("./controllers/planets.ts")

require('dotenv').config()

app.use(express.json());

app.use('/static', express.static('uploads'));

app.get("/api/planets", getAll)

app.get("/api/planets/:id", getOneByID)

app.post("/api/planets", create)

app.post("/api/:id/image", upload.single('image'), insertImage )

app.put("/api/planets/:id", updateByid)

app.delete("/api/planets/:id", deleteByid)

app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`)
})
