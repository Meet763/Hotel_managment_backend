const mongoose = require('mongoose');

const mongoURL  = 'mongodb://localhost:27017/hotels'

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log("connection is established")
})

db.on('disconnected', () => {
    console.log("mongo disconnected")
})

db.on('error', (err) => {
    console.log("mongo  error")
})

module.exports  = db;