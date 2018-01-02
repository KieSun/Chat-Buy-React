import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
  messageId: String,
  // 聊天双方
  bothSide: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      name: {
        type: String
      },
      lastId: {
        type: String
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

const chat = mongoose.model("chat", chatSchema);
export default chat;