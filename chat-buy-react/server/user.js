const express = require('express')
const model = require('./model')
const User = model.getModel('user')
const key = require('./key')
const jwt = require('jsonwebtoken')
const Router = express.Router()

Router.post('/register', function(req, res) {
	const {user, pwd, type} = req.body
	console.log(user);
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

Router.post('/login', function(req, res) {
    const {user, pwd} = req.body
	User.findOne({user, pwd},{pwd: 0}, function(e, doc) {
		if (!doc) {
			return res.json({code: 1, msg: '用户名或密码错误'})
		} 
		if (error) {
			return res.json({code: 1, msg: '后端出错'})
		}
		const token = jwt.sign({id: doc._id}, key, {
			expiresIn: 60 * 60 * 24 * 7
		});
		return res.json({code: 0, data: doc, token})
	})
})

Router.post('/info', function(req, res) {
	const {id} = req.decoded
	User.findOne({_id: id},{pwd: 0}, function(e, doc) {
		if (e || !doc) {
			return res.json({code: 2, msg: '后端出错'})
		} 
		return res.json({code: 0, data: doc})
	})
})

Router.post('/orders', function(req, res) {
	const {id} = req.decoded

	User.findOne({_id: id})
		.populate('orders')
		.exec(function(error, user) {
			if (error) {
				return res.json({code: 1, msg: '后端出错'})
			}
			if (!user) {
				return res.json({code: 2, errorMsg: '找不到该用户'})
			}

			return res.json({code: 0, data: user.orders})
		})

	
})


module.exports = Router