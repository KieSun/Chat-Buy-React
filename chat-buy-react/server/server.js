const express = require('express')
const userRouter = require('./user')
const goodsRouter = require('./goods')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const key = require('./key')
const jwtMiddleware = require('./jwtMiddleware')


app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', jwtMiddleware, userRouter)
app.use('/goods', goodsRouter)


app.listen(1717,function(){
	console.log('Node app start at port 1717')
})



