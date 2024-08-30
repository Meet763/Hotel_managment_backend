const express = require('express');
const app = express();
const db = require('./db');
const bodyParsor = require('body-parser');
app.use(bodyParsor.json()); //req.body ma store karse
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const passport = require('./auth');


// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date(). toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}   

app.use(logRequest);
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})


app.get('/', function (req, res) {
    res.send('welcome to my hotel')
})

const personSchema = require('./routes/personRoutes')
const menuSchema = require('./routes/menuRoutes')

app.use('/person', personSchema)
app.use('/menu', menuSchema)

app.listen(PORT, () => {
    console.log("server is on")
})