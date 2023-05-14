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

app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`)
})
