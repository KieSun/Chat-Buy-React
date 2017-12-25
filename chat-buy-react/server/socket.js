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
        if (user) {
          client.emit("userName", user.user);
        } else {
          client.emit("serverError", { errorMsg: "找不到该用户" });
        }
      });
    });
    client.on("sendMessage", data => {
      const { from, to, message } = data;
      const messageId = [from, to].sort().join("");
      const obj = {
        from,
        to,
        message,
        date: Date()
      };
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
          console.log(
            results[0].hasOwnProperty("from")
              ? results[0].from
              : results[1].from,
            results[0].hasOwnProperty("to") ? results[0].to : results[1].to
          );
          if (err) {
            client.emit("error", { errorMsg: "找不到聊天对象" });
          } else {
            Chat.findOne({
              messageId
            }).exec(function(err, doc) {
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
                    io.to(clients[to]).emit("message", {
                      obj,
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
                    io.to(clients[to]).emit("message", obj);
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
