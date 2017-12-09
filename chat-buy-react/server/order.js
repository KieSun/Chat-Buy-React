const express = require('express')
const model = require('./model')
const User = model.getModel('user')
const AllOrders = model.getModel('allOrders')
const Router = express.Router()

Router.get('/allOrders', function(req, res) {
    AllOrders.find({state: 0}, function(error, doc) {
      return res.json({code: 0, data: doc})
    })
})

module.exports = Router