const {MongoClient} = require("mongodb");
const url = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(url);
const database1 = "e-comm";

//Database connection
async function dbconnect () {
    const result = await client.connect();
    const database = result.db(database1);
    return database.collection("products"); 
}

module.exports = dbconnect;