const mongoose = require('mongoose');
require('dotenv').config();

let connectionStatus = 'disconnected';

const startDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        connectionStatus = "The database has been connected";
    } catch (err) {
        console.error("Failed to connect to database");
        connectionStatus = "error";
    }
};  

const stopDatabase = async () => {
    await mongoose.disconnect();
    connectionStatus = "closed";
};

const getConnectionStatus = async () => {
    return JSON.stringify(connectionStatus);
};

module.exports = { startDatabase, stopDatabase, getConnectionStatus };