
const pgPromise = require("pg-promise")

const db = pgPromise()({
    host:'127.0.0.1',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: ''
  })


const createTable = async ()=>{
  await db.none(`
    DROP TABLE IF EXISTS users;

    CREATE TABLE users (
        id SERIAL NOT NULL PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        token TEXT
    );
    `)
    
}

createTable()


module.exports={
    db
}