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

Router.post('/getOrder', function(req, res) {
	const {orderId} = req.body
	const {id} = req.decoded
	
	AllOrders.update({_id: orderId, state: 0},{
		$set: {
			state: 1,
			deliver: id
		}}, function(error, result) {
			if (error) {
				return res.json({code: 1, msg: '后端出错'})
			}
			if (result.nModified === 0) {
				return res.json({code: 1, msg: '该订单已被接单'})
			}
			User.update({_id: id}, {
				$push: {
						orders: orderId
				}
			}, function(e, user) {
				if (e || !user) {
						return res.json({code: 1, msg: '后端出错'})
				}
				return res.json({code: 0, msg: '接单成功'})
			})

		})
})

module.exports = Router