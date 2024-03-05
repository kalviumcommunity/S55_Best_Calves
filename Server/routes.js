const express = require('express');
const app = express.Router()
const {getConnectionStatus}=require('./db')
const {userModel} = require('./schema')

app.use(express.json());

app.get('/',  async (req, res) => {
    const connectionStatus = await getConnectionStatus()
    res.send(connectionStatus)
 });

app.get('/ping', (req, res) => {
    res.send('Hello');
});

app.get("/get", (req, res, next) => {
    try {
        res.send("Get request on home page");
    } catch (error) {
        next(error); 
    }
});

app.post("/post", (req, res, next) => {
    try {
        res.send("Post request");
    } catch (error) {
        next(error);
    }
});

app.patch("/patch", (req, res, next) => {
    try {
        res.send("Patch request");
    } catch (error) {
        next(error);
    }
});

app.delete("/delete", (req, res, next) => {
    try {
        res.send("Delete requeste");
    } catch (error) {
        next(error);
    }
});


app.get('/players',async(req,res)=>{
    try{
        const test = await userModel.find()
        res.json(test)
    }catch(err){
        console.log(err)
    }
})

app.post('/add', async (req, res) => {
    try {
        const newData = userModel.create(req.body) ;
    } catch (error) {
        console.error(error);
        res.send('Error');
    }
});

module.exports = app

