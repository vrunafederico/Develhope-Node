
const {db} = require("./Server.js")

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