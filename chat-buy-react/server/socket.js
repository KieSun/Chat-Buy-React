let clients = {};
global.clients = clients;
const model = require("./model");
const User = model.user;
const Chat = model.chat;
const async = require("async");

module.exports = function() {
  io.on("connection", function(client) {
    // 将用户存储一起
    client.on("user", user => {
      clients[user] = client.id;
      client.user = user;
    });
    // 断开连接清除用户信息
    client.on("disconnect", () => {
      if (client.user) {
        delete clients[client.user];
      }
    });
    // 发送聊天对象昵称
    client.on("getUserName", id => {
      User.findOne({ _id: id }, (error, user) => {
        if (user) {
          client.emit("userName", user.user);
        } else {
          client.emit("serverError", { errorMsg: "找不到该用户" });
        }
      });
    });
    // 接收信息
    client.on("sendMessage", data => {
      const { from, to, message } = data;
      const messageId = [from, to].sort().join("");
      const obj = {
        from,
        to,
        message,
        date: Date()
      };
      // 异步操作，找到聊天双方
      async.parallel(
        [
          function(callback) {
            User.findOne({ _id: from }, (error, user) => {
              if (error || !user) {
                callback(error, null);
              }
              callback(null, { from: user.user });
            });
          },
          function(callback) {
            User.findOne({ _id: to }, (error, user) => {
              if (error || !user) {
                callback(error, null);
              }
              callback(null, { to: user.user });
            });
          }
        ],
        function(err, results) {
          if (err) {
            client.emit("error", { errorMsg: "找不到聊天对象" });
          } else {
            // 寻找该 messageId 是否存在
            Chat.findOne({
              messageId
            }).exec(function(err, doc) {
              // 不存在就自己创建保存
              if (!doc) {
                var chatModel = new Chat({
                  messageId,
                  bothSide: [
                    {
                      user: from,
                      name: results[0].hasOwnProperty("from")
                        ? results[0].from
                        : results[1].from
                    },
                    {
                      user: to,
                      name: results[0].hasOwnProperty("to")
                        ? results[0].to
                        : results[1].to
                    }
                  ],
                  messages: [obj]
                });
                chatModel.save(function(err, chat) {
                  if (err || !chat) {
                    client.emit("serverError", { errorMsg: "后端出错" });
                  }
                  if (clients[to]) {
                    // 该 messageId 不存在就得发送发送方昵称
                    io.to(clients[to]).emit("message", {
                      obj: chat.messages[chat.messages.length - 1],
                      name: results[0].hasOwnProperty("from")
                        ? results[0].from
                        : results[1].from
                    });
                  }
                });
              } else {
                doc.messages.push(obj);

                doc.save(function(err, chat) {
                  if (err || !chat) {
                    client.emit("serverError", { errorMsg: "后端出错" });
                  }
                  if (clients[to]) {
                    io.to(clients[to]).emit("message", {
                      obj: chat.messages[chat.messages.length - 1]
                    });
                  }
                });
              }
            });
          }
        }
      );
    });
  });
};
