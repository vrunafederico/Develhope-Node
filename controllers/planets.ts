
const Joi = require('joi')
const express = require('express')
const app = express()

let planets = [
    {
      id: 1,
      name: "Earth",
    },
    {
      id: 2,
      name: "Mars",
    },
  ];
  

const getAll = (req, res) => {
    res.status(200).json(planets)
}

const getOneByID = (req, res) => {
    const element = planets.find(el => el.id === Number(req.params.id))
    if(!element){
      res.status( 404 ).json("Not found")
      return
    }
    res.status( 200 ).json(element)
}

const create = (req, res) => {
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
}

const updateByid = (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().required()
      })
    
    const data = schema.validate(req.body)
    
    planets.map((el) =>{
      if(el.id === Number(req.params.id)){
        el.name = data.value.name
        res.status(200).json({msg: "Done"})
      }
    })  
}
      

const deleteByid = (req, res) => {
    planets = planets.filter((el) => el.id !== Number(req.params.id))
    res.status(200).json({msg: "Done"})
}

module.exports={
    getAll,
    getOneByID,
    create,
    updateByid,
    deleteByid    
}