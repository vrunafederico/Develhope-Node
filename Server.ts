import { array } from "joi";

const Joi = require('joi')
const express = require('express')
const app = express()
const {getAll, getOneByID,create,updateByid,deleteByid,createTable } = require("./controllers/planets.ts")

require('dotenv').config()

app.use(express.json());

app.get("/api/planets", getAll)

app.get("/api/planets/:id", getOneByID)

app.post("/api/planets", create)

app.put("/api/planets/:id", updateByid)

app.delete("/api/planets/:id", deleteByid)

app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`)
})
