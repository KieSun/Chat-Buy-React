const express = require("express");
const app = express();
const server = require("http").createServer();
const io = require("socket.io")(server);
const userRouter = require("./user");
const goodsRouter = require("./goods");
const orderRouter = require("./order");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const key = require("./key");
const jwtMiddleware = require("./jwtMiddleware");

app.use(cookieParser());
app.use(bodyParser.json());

app.use("/user", jwtMiddleware, userRouter);
app.use("/goods", jwtMiddleware, goodsRouter);
app.use("/order", jwtMiddleware, orderRouter);

io.on("connection", function(client) {
  console.log("io connection1");
});

server.listen(1717, function() {
  console.log("Node app start at port 1717");
});
