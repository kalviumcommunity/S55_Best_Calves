const express = require('express');
const app = express.Router();
const { getConnectionStatus } = require('./db');
const { userModel } = require('./schema');
const Joi = require('joi');

app.use(express.json());

const updateSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    calf_ratings: Joi.number().min(0).max(10).required(),
    height: Joi.number().required(),
    img_url: Joi.string().required()
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

module.exports = app;
