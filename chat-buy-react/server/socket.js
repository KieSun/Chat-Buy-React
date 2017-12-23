let clients = {};
global.clients = clients;
const model = require("./model");
const User = model.user;
const Chat = model.chat;
const async = require("async");

module.exports = function() {
  io.on("connection", function(client) {
    client.on("user", user => {
      clients[user] = client.id;
      client.user = user;
    });
    client.on("disconnect", () => {
      if (client.user) {
        delete clients[client.user];
      }
    });
    client.on("getUserName", id => {
      User.findOne({ _id: id }, (error, user) => {
        client.emit("userName", user.user);
      });
    });
    client.on("sendMessage", data => {
      const { from, to, message } = data;
      async.parallel(
        [
          function(callback) {
            User.findOne({ _id: from }, (error, user) => {
              if (error || !user) {
                callback(error, null);
              }
              callback(null, null);
            });
          },
          function(callback) {
            User.findOne({ _id: to }, (error, user) => {
              if (error || !user) {
                callback(error, null);
              }
              callback(null, null);
            });
          }
        ],
        function(err, results) {
          if (err) {
            client.emit("error", { errorMsg: "找不到聊天对象" });
          } else {
            Chat.findOne({
              messageId: [from, to].sort().join("")
            }).exec(function(err, doc) {
              if (!doc) {
                var chatModel = new Chat({
                  messageId: [from, to].sort().join(""),
                  bothSide: [
                    {
                      user: from
                    },
                    {
                      user: to
                    }
                  ],
                  messages: [
                    {
                      from,
                      to,
                      message
                    }
                  ]
                });
                chatModel.save(function(err, chat) {
                  if (err || !chat) {
                    client.emit("serverError", { errorMsg: "后端出错" });
                  }
                });
              } else {
                doc.messages.push({
                  from,
                  to,
                  message
                });

                doc.save(function(err, chat) {
                  if (err || !chat) {
                    client.emit("serverError", { errorMsg: "后端出错" });
                  }
                });
              }
            });
          }
          if (clients[to]) {
            io.to(clients[to]).emit("message", { message, from, to });
          }
        }
      );
    });
  });
};
