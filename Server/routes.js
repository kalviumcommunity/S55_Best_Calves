const express = require('express');
const app = express.Router();
const { getConnectionStatus } = require('./db');
const { userModel } = require('./schema');
const {loginModel} = require('./userSchema.js')
const Joi = require('joi');
const jwt = require('jsonwebtoken')

require('dotenv').config()
app.use(express.json());

const updateSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    calf_ratings: Joi.number().min(0).max(10).required(),
    height: Joi.number().required(),
    img_url: Joi.string().required(),
    created_by: Joi.string()
});

// GET request to get connection status
app.get('/', async (req, res) => {
    const connectionStatus = await getConnectionStatus();
    res.send(connectionStatus);
});

// POST request to add a new user
app.post('/add', async (req, res) => {
    try {
        const { error, value } = updateSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const newData = await userModel.create(req.body);
        res.send(newData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
});

// PUT request to update user data by ID
app.put(`/updateCard/:id`, async (req, res) => {
    try {
        const { error, value } = updateSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const _id = req.params.id;
        const updatedUser = await userModel.findByIdAndUpdate(_id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
});

// DELETE request to delete user data by ID
app.delete('/delete/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const deletedUser = await userModel.findByIdAndDelete(_id);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.json(deletedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
});

// GET request to get user data by ID
app.get('/players/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await userModel.findById(_id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
});

// GET request to get all users
app.get('/players', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
});

app.post('/signup',async(req,res)=>{
    try{
        const user = await loginModel.create({
            username:req.body.username,
            password:req.body.password
        })
        res.send(user)
    }catch(err){
        console.error(err)
    }
  
})
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await loginModel.findOne({ username, password });
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid username / password' });
        }

        
        res.status(200).json({ user });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/logout',(req,res)=>{
    res.clearCookie('username')
    res.clearCookie('password')

    res.status(200).json({message:'Logout succesful'})
})

app.post('/auth', async(req,res) => {
    try{const {username,password} = req.body
    const user = {
        "username" : username,
        "password" : password
    }
    const ACCESS_TOKEN = jwt.sign(user,process.env.ACCESS_TOKEN)
    res.cookie('token',ACCESS_TOKEN,{maxAge:365*24*60*60*1000})
    res.json({"acsessToken" : ACCESS_TOKEN})
}catch(err){
    console.error(err)
    res.status(500).json({error:'Internal Server Error'})
}
});

module.exports = app;
