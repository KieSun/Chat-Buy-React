var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
var DB_URL = "mongodb://localhost/chat-buy-react";
mongoose.connect(DB_URL, { useMongoClient: true });
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  user: { type: String, require: true },
  pwd: { type: String, require: true },
  type: { type: String, require: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "allOrders" }]
});

const allOrdersSchema = mongoose.Schema({
  price: { type: Number, require: true },
  desc: { type: String, require: true },
  count: { type: Number, require: true },
  state: { type: Number, require: true },
  date: { type: Date, require: true, default: Date.now },
  customer: { type: Schema.Types.ObjectId, ref: "user" },
  deliver: { type: Schema.Types.ObjectId, ref: "user" }
});

var chatSchema = new Schema({
  send: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  recieve: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  sendNoRead: Number,
  recieveNoRead: Number,
  messages: [
    {
      from: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      to: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      message: String,
      time: { type: Date, default: Date.now }
    }
  ]
});

mongoose.connection.on("error", function(err) {
  console.error("MongoDB error: %s", err);
});

module.exports = {
  user: mongoose.model("user", userSchema),
  allOrders: mongoose.model("allOrders", allOrdersSchema)
};
