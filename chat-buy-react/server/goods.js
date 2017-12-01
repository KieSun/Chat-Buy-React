const express = require('express')
const model = require('./model')
const Goods = model.getModel('goods')
const Router = express.Router()

Router.get('/list', function(req, res) {
  Goods.find({}, function(e, doc) {
    if (!doc) {
      return res.json({code: 1, msg: '后端出错'})
    } 
    return res.json({code: 0, data: doc})
  })
})

module.exports = Router