const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')
const app = express()
const router = require('./postRouter/router')

app.use(bodyParser.json())
app.use('/posts', router)


mongoose.connect(process.env.DB, { useUnifiedTopology: true, useNewUrlParser: true  })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('We are connected to Atlas')
});


app.listen('3000', () => {
    console.log('Listening on por 3000')
})