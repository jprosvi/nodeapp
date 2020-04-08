const mongoose = require('mongoose')

const capitalSchema = mongoose.Schema({
    country: String,
    capital: String
})


const capitalModel = mongoose.model('worldCapitals', capitalSchema)

module.exports = capitalModel

