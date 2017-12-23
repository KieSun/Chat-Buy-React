const express = require("express");
const model = require("./model");
const async = require("async");
const Chat = model.chat;
const Router = express.Router();

Router.post("/getMessageList", function(req, res) {
  const { id } = req.decoded;
  Chat.find({
    messageId: { $regex: id }
  }).exec(function(err, doc) {
    if (err) {
      return res.json({ code: 1 });
    }
    return res.json({ code: 0, data: doc });
  });
});

module.exports = Router;
