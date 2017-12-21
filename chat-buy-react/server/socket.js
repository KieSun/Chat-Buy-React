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
      console.log(user);
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
              $or: [
                { userOne: from, userTwo: to },
                { userOne: to, userTwo: from }
              ]
            }).exec(function(err, doc) {
              if (!doc) {
                var chatModel = new Chat({
                  userOne: from,
                  userTwo: to,
                  sendNoRead: 0,
                  recieveNoRead: 1,
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
                    client.emit("error", { errorMsg: "后端出错" });
                  }
                });
              } else {
                doc.messages.push({
                  from,
                  to,
                  message
                });

                if (doc.send == from) {
                  doc.recieveNoRead += 1;
                } else {
                  doc.sendNoRead += 1;
                }

                doc.save(function(err, chat) {
                  if (err || !chat) {
                    client.emit("error", { errorMsg: "后端出错" });
                  }
                });
              }
            });
          }
          console.log(clients[to]);

          if (clients[to]) {
            io.to(clients[to]).emit("message", { message, from, to });
          }
        }
      );
    });
  });
};
