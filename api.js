const express = require("express");
const dbconnect = require("./mongodb-connection");
const app = express();

app.use(express.json());

app.get("/", async(req, res) => {
    let data = await dbconnect();
    data = await data.find().toArray();
    res.send(data);
    // demo.innerHTML = data;
    // res.end();
})

app.get("*",(req, res) => {
    res.send("Page not Found");
})

app.post("/", async (req, res) => {
    console.log(req.body);
    res.send(req.body);
    res.send({say_hi : "hello rohit!"});

    // let data = await dbconnect();
    // let result = await data.insertMany(req.body);
    // res.send(result);
})

app.listen(8080);