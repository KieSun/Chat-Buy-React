const express = require("express");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const key = require("./key");

const app = global.app = express();

const server = require("http").createServer(app);
const io = global.io = require("socket.io")(server);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require("./jwtMiddleware")());

require("./socket")(io);
require('./router')(app)

server.listen(1717, function() {
  console.log("Node app start at port 1717");
});
