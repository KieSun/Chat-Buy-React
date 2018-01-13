const model = require("./model");
const Chat = model.chat;

module.exports = function(app) {
  // 获取所有聊天信息
  app.post("/chat/getMessageList", function(req, res) {
    const { id } = req.decoded;
    Chat.find({
      messageId: { $regex: id }
    }).exec(function(err, doc) {
      if (err) {
        return res.status(500).json({ msg: "后端出错" });
      }
      return res.status(200).json({ code: 0, data: doc });
    });
  });
  // 清除未读消息
  app.post("/chat/cleanNoRead", function(req, res) {
    const { id } = req.decoded;
    const { messageId, readId } = req.body;
    Chat.findOneAndUpdate(
      { "bothSide.user": id, messageId },
      { $set: { "bothSide.$.lastId": readId } },
      function(error, result) {
        if (error || !result) {
          return res.status(500).json({ msg: "后端出错" });
        }
        return res.json({ code: 0 });
      }
    );
  });
};
