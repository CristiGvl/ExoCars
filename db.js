const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://cristiangiuvelic:1525CriDan@cluster0.sdh4d.mongodb.net/ExoCars'

mongoose.connect(mongoURL)

var connection = mongoose.connection

connection.on('error', ()=>{
    console.log('Mongo DB Connection failed')
})

connection.on('connected' , ()=>{
    console.log('Mongo DB Connection Successful')
})

module.exports = mongoose