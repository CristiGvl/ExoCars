const express = require("express");

const app = express();

const dbConfig = require('./db')
const carsRoute = require('./routes/carsRoute')


app.use('/api/cars' , carsRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Node Server Started using nodemon'));