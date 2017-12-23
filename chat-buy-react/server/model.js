var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
var DB_URL = "mongodb://localhost/chat-buy-react";
mongoose.connect(DB_URL, { useMongoClient: true });
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  // 用户名
  user: { type: String, require: true },
  // 密码
  pwd: { type: String, require: true },
  // 类型
  type: { type: String, require: true },
  // 所有订单
  orders: [{ type: Schema.Types.ObjectId, ref: "allOrders" }]
});

const allOrdersSchema = mongoose.Schema({
  // 价格
  price: { type: Number, require: true },
  // 购买商品描述
  desc: { type: String, require: true },
  // 购买多少商品
  count: { type: Number, require: true },
  // 订单状态 0：未接单 1：接单 2：已送达
  state: { type: Number, require: true },
  // 下单时间
  date: { type: Date, require: true, default: Date.now },
  // 购买者
  customer: { type: Schema.Types.ObjectId, ref: "user" },
  // 接单者
  deliver: { type: Schema.Types.ObjectId, ref: "user" }
});

var chatSchema = new Schema({
  messageId: String,
  // 聊天双方
  bothSide: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      lastId: {
        type: Number
      }
    }
  ],
  messages: [
    {
      // 发送方
      from: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      // 接收方
      to: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      // 发送的消息
      message: String,
      // 发送日期
      date: { type: Date, default: Date.now }
    }
  ]
});

mongoose.connection.on("error", function(err) {
  console.error("MongoDB error: %s", err);
});

module.exports = {
  user: mongoose.model("user", userSchema),
  allOrders: mongoose.model("allOrders", allOrdersSchema),
  chat: mongoose.model("chat", chatSchema)
};
