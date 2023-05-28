
const pgPromise = require("pg-promise")

const Joi = require('joi')
const express = require('express')
const app = express()


const db = pgPromise()({
  host:'127.0.0.1',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: ''
})


const createTable = async ()=>{
  await db.none(`
    DROP TABLE IF EXISTS planets;

    CREATE TABLE planets(
      id SERIAL NOT NULL PRIMARY KEY,
      name TEXT NOT NULL
    );
    
    INSERT INTO planets (name) VALUES ('Earth');
    INSERT INTO planets (name) VALUES ('Mars');
    `)
    
    
}



createTable()



const getAll = async (req, res) => {
    const planets = await db.many(`SELECT * FROM planets;`)
    res.status(200).json(planets)
}

const getOneByID = async (req, res) => {
    const element = await db.one(`SELECT * FROM planets WHERE id=$1;`, [req.params.id])
    if(!element){
      res.status( 404 ).json("Not Found")
      return
    }
    res.status( 200 ).json(element)
}

const create = async (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().required()
      })
    
      const data = schema.validate(req.body)

      if(data.error){
        res.status(404).json({msg: "error"})
        return
      }

      await db.none(`INSERT INTO planets (name) VALUES ($1);`, [data.value.name])
      res.status(200).json({msg: "Done"})
}

const updateByid = async (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().required()
      })
    
    const data = schema.validate(req.body)
    
    if(data.error){
      res.status(404).json({msg: "error"})
      return
    }

    await db.none(`UPDATE planets SET name=$2 WHERE id=$1;`, [req.params.id, data.value.name])
    res.status(200).json({msg: "Done"})
 
}
      

const deleteByid = async (req, res) => {

    await db.none(`DELETE FROM planets WHERE id=$1;`, [req.params.id])
    res.status(200).json({msg: "Done"})
}

module.exports={
    getAll,
    getOneByID,
    create,
    updateByid,
    deleteByid,
    createTable    
}
