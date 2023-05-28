import { array } from "joi";

const Joi = require('joi')
const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json());

type Planet = {
  id: number,
  name: string,
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];


app.get("/api/planets", (req, res) => {
  res.status(200).json(planets)
})

app.get("/api/planets/:id",  (req, res) =>{
  const element = planets.find(el => el.id === Number(req.params.id))
  if(!element){
    res.status( 404 ).json("Not found")
    return
  }
  res.status( 200 ).json(element)
})

app.post("/api/planets", (req, res) =>{
  const schema = Joi.object().keys({
    id: Joi.number().integer().required(),
    name: Joi.string().required()
  })

  const data = schema.validate(req.body)

  if(data.error){
    res.status(404).json({msg: "error"})
    return
  }

  planets.push(data.value)
  res.status(200).json({msg: "Done"})
})

app.put("/api/planets/:id", (req, res) =>{
  const schema = Joi.object().keys({
    name: Joi.string().required()
  })

  const data = schema.validate(req.body)

  if(data.error){
    res.status(404).json({msg: "error"})
  }

  let object = planets.find(el => el.id === Number(req.params.id))

  if(object){
    object.name = data.value.name
    res.status(200).json({msg: "Done"})
    return
  }

  res.status(404).json({msg: "Not found"})
})

app.delete("/api/planets/:id", (req, res) =>{
  const index = planets.findIndex((el) => el.id === Number(req.params.id))

  if(index === -1){  
    res.status(404).json({msg: "Not found"})
    return
  }

  planets.splice(index, 1); 
  res.status(200).json({msg: "Done"})
 
})

app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`)
})
