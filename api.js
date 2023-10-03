const express = require("express");
const dbconnect = require("./mongodb-connection");
const app = express();

app.use(express.json());

//MongoDB to LocalHost
app.get("/", async(req, res) => {
    let data = await dbconnect();
    data = await data.find().toArray();
    res.send(data);
    // res.end();
})

app.get("*",(req, res) => {
    res.send("Page not Found");
})

app.post("/", async (req, res) => {
    // console.log(req.body);
    // res.send(req.body);
    // res.send({say_hi : "hello rohit!"});

    //connect MongoDB to Postman server
    let data = await dbconnect();
    let result = await data.insertOne(req.body);
    res.send(result);
})

app.listen(8080);