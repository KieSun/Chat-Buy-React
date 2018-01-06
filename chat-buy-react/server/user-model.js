import mongoose , { Schema } from "mongoose";

const userSchema = Schema({
  // 用户名
  user: { type: String, require: true },
  // 密码
  pwd: { type: String, require: true },
  // 类型
  type: { type: String, require: true },
  // 所有订单
  orders: [{ type: Schema.Types.ObjectId, ref: "allOrders" }]
});

const user = mongoose.model("user", userSchema);
export default user;