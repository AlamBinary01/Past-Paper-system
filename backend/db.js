const mongoose = require('mongoose');
require('dotenv').config();

const url =  process.env.CONNECTION_STRING;
// Function to establish a connection to MongoDB
const databaseConnection = async () => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = databaseConnection;
