const express = require('express')
const userRouter = require('./user')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(bodyParser.json());

app.use('/user',userRouter)

app.get('/', function(req, res) {
	console.log(req)
})

app.listen(1717,function(){
	console.log('Node app start at port 1717')
})



