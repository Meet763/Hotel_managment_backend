const express = require('express');
const app = express();
const db = require('./db');
const bodyParsor = require('body-parser');
app.use(bodyParsor.json()); //req.body ma store karse


app.get('/', function (req, res) {
    res.send('welcome to my hotel')
})

const personSchema = require('./routes/personRoutes')
const menuSchema = require('./routes/menuRoutes')

app.use('/person', personSchema)
app.use('/menu', menuSchema)

app.listen(3000, () => {
    console.log("server is on")
})