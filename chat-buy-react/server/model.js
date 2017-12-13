var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
var DB_URL = "mongodb://localhost/chat-buy-react";
mongoose.connect(DB_URL, { useMongoClient: true });

const userSchema = mongoose.Schema({
  user: { type: String, require: true },
  pwd: { type: String, require: true },
  type: { type: String, require: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "allOrders" }]
});

const allOrdersSchema = mongoose.Schema({
  price: { type: Number, require: true },
  desc: { type: String, require: true },
  count: { type: Number, require: true },
  state: { type: Number, require: true },
  date: { type: Date, require: true, default: Date.now() },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  deliver: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
});

mongoose.connection.on("error", function(err) {
  console.error("MongoDB error: %s", err);
});

module.exports = {
  user: mongoose.model("user", userSchema),
  allOrders: mongoose.model("allOrders", allOrdersSchema)
};
