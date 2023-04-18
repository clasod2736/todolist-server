const mongoose = require('mongoose')
require("dotenv").config();

async function connectDB () {
    const url = `mongodb+srv://${process.env.REACT_APP_DB_USERNAME}:${process.env.REACT_APP_DB_PASSWORD}@joons.ktbaivy.mongodb.net/?retryWrites=true&w=majority`
    await mongoose.connect(url, {useNewUrlParser: true});
    console.log("database connected")
}

module.exports = connectDB;