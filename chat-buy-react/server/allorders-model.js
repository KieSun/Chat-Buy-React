import mongoose, { Schema } from "mongoose";

const allOrdersSchema = Schema({
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

const allOrders = mongoose.model("allOrders", allOrdersSchema);
export default allOrders;