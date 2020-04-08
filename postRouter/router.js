const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const capitalModel = require('../model/model.js')

router.get('/json', (req, res) => {
    capitalModel.find({}, (error, data) => {
        res.json(data)
    })

})

router.get('/', (req, res) => {
    capitalModel.find({}, (error, data) => {
        if(error) res.status(500).send(error)
        if(data) {
            var stringOutput= '<h1>Countries and Capitals</h1>'
            data.forEach((capitalCountry) => {
                stringOutput = stringOutput + "<h3>" + capitalCountry.country + ": " + capitalCountry.capital + "</h3>"
            })
            res.send(stringOutput)
            console.log(data)
        } else {
            res.send('No records yet!')
        }
    })

})

router.post('/', (req, res) => {
   const entries = new capitalModel({
       country: req.body.country,
       capital: req.body.capital
   })
   entries.save()
   res.json(entries)
})

router.put('/:id', (req, res) => {
    capitalModel.findById(req.params.id, (error, data) => {
        if(error) res.status(500.).send(error)
        if(data) {
            data.capital = req.body.capital
            data.country = req.body.country
            data.save()
            res.json(data)
            console.log(data)
        } else {
            res.send(`ID: ${req.params.id} not found`)
        }
    })

})

router.delete('/:id', (req, res) => {
    capitalModel.findByIdAndDelete(req.params.id, (error, data) => {
        if(error) res.status(500).send(error)
        if(data) {
            res.send(`ID: ${req.params.id} deleted`)
        } else {
            res.send(`ID: ${req.params.id} not found`)
        }
    })
})
module.exports = router
