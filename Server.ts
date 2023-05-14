const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json());

app.use((req, res, next) => {
  console.log(req)
  next()
})

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

app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`)
})
