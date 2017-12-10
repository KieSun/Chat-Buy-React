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
	User.findOne({user}, function(e, d) {
		if (d) {
			return res.json({code: 1, msg: '已存在该用户'})
		} 
		const model = new User({user, pwd, type})
		model.save(function(error, doc) {
			if (error) {
				return res.json({code: 1, msg: '后端出错'})
			}
			const {user, type, _id} = doc
			const token = jwt.sign({id: _id}, key, {
				expiresIn: 60 * 60 * 24 * 7
			});
			return res.json({code: 0, token, data: {user, type, _id}})
		})
	})
})

module.exports = Router