const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
global.io = io;
const socket = require("./socket")();

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

server.listen(1717, function() {
  console.log("Node app start at port 1717");
});
