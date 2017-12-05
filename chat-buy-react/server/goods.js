const express = require('express')
const model = require('./model')
const foods = require('./foods.json')
const Goods = model.getModel('goods')
const User = model.getModel('user')
const Router = express.Router()

Router.get('/list', function(req, res) {
    return res.json({code: 0, data: foods.list})
})

Router.post('/buy', function(req, res) {
    const {id} = req.decoded
    const {buyList} = req.body
    let price = 0
    let count = 0
    let desc = ''
    buyList.forEach(v => {
        price += v.price * v.count
        count += v.count
        if (!desc) {
            desc = foods.list.find(food => {
                return food.id === v.id
            }).name
        }
    })
    const order = {
        price,
        count,
        state: 0,
        desc,
        customerId: id
    }
	User.findByIdAndUpdate({
            _id: id
        }, {
            $push: { 
                orders: order 
            }
        }, 
        function(e, doc) {
            if (!doc || e) {
                return res.json({code: 2, msg: 'token失效'})
            } 
            res.json({code: 0, msg: '成功购买'})
	    })
})

module.exports = Router