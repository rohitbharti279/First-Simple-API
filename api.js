const express = require("express");
const dbconnect = require("./mongodb-connection");
const mongoDB = require("mongodb");
const app = express();

app.use(express.json());  //Using req to get the body from postman 

//Mongodb to LocalHost
app.get("/", async(req, res) => {
    let data = await dbconnect();
    data = await data.find().toArray();
    res.send(data);
    // res.end();
})

app.post("/", async (req, res) => {
    // console.log(req.body);  // (2) what ever in POSTMAN it shoud be displayed as console.log
    // res.send(req.body);  // (3) update bottom (body) section of postman whatever written in top section
    // res.send({say_hi : "hello rohit!"}); // (1) show in POSTMAN 

    //connect Mongodb to Postman server
    let data = await dbconnect();
    let result = await data.insertOne(req.body); // what ever in POSTMAN it shoud be added in mongodb
    res.send({Insert: "inserted", updated_Data:result}); //showing data in postman
})

app.put('/', async (req, res) => {
    // console.log(req.body); // what ever in POSTMAN it shoud be displayed

    let data = await dbconnect();
    // let result = data.updateOne({brand: "Micromax"},{$set:{price: 6}}); //static data
    let result = data.updateOne({brand: req.body.brand},{$set: req.body}); //dynamic data from POSTMAN
    res.send({update: "updated",show_data: result}); //show in POSTMAN 
})


//delete by name
// app.delete("/:name", async(req, res) => {
//     console.log(req.params.name);
//     const data = await dbconnect();
//     const result = await data.deleteOne({name: req.params.name});
//     res.send(result);
// })

//delete by id
app.delete("/:id", async(req, res) => {
    console.log(req.params.id);
    const data = await dbconnect();
    const result = await data.deleteOne({_id: new mongoDB.ObjectId(req.params.name)});
    res.send(result);
})




app.get("*",(req, res) => {
    res.send("Page not Found");
})

app.listen(8080);