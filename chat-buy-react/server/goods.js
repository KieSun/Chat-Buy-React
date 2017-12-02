const express = require('express')
const model = require('./model')
const foods = require('./foods.json')
const Goods = model.getModel('goods')
const Router = express.Router()

Router.get('/list', function(req, res) {
    return res.json({code: 0, data: foods.list})
})

module.exports = Router