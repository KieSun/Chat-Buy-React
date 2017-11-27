const express = require('express')
const model = require('./model')
const User = model.getModel('user')

const Router = express.Router()

Router.post('/register', function(req, res) {
    const {user, pwd, type} = req.body
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
			res.cookie('id', _id, { maxAge: 60 * 60 * 24, httpOnly: true })
			return res.json({code: 0, data: {user, type, _id}})
		})
	})
})

Router.post('/login', function(req, res) {
    const {user, pwd} = req.body
	User.findOne({user, pwd},{pwd: 0}, function(e, doc) {
		if (!doc) {
			return res.json({code: 1, msg: '用户名或密码错误'})
		} 
		res.cookie('id', doc._id)
		return res.json({code: 0, doc})
	})
})


module.exports = Router