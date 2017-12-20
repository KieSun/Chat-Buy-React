let clients = {};
global.clients = clients;
const model = require("./model");
const User = model.user;
const Chat = model.chat;
const async = require("async");

module.exports = function() {
  io.on("connection", function(client) {
    client.emit("open");
    client.on("user", user => {
      clients[user] = client;
      var current = user;
    });
    client.on("disconnect", () => {
      delete clients.current
      console.log(clients);
    });
    client.on("getUserName", id => {
      User.findOne({ _id: id }, (error, user) => {
        client.emit("userName", user.user);
      });
    });
    client.on("sendMessage", data => {
      const {from, to, message} = data
      async.parallel([
        function(callback) { 
          User.findOne({_id: from}, (error, user) => {
            if (error || !user) {
              callback(error, null)
            }
            callback(null, null)
          })
        },
        function(callback) { 
          User.findOne({_id: to}, (error, user) => {
            if (error || !user) {
              callback(error, null)
            }
            callback(null, null)
          })
        }
    ], function(err, results) {
        if (err) {
          client.emit("error", {errorMsg: '找不到聊天对象'});
        } else {
          Chat.findOne({$or: [
            { send: from, recieve: to},
            { send: to, recieve: from}]})
            .exec(function (err,doc) {

            if(!doc){
                var chatModel = new Chat({
                    send:from,
                    recieve:to,
                    sendNoRead:0,
                    recieveNoRead:1,
                    messages: [{
                      from,
                      to,
                      message
                    }]
                })
                chatModel.save(function (err, chat) {
                    if(err || !chat){
                      client.emit("error", {errorMsg: '后端出错'});
                    }
                })
            }else{

              doc.messages.push({
                from,
                to,
                message
              })

              if (doc.send == from) {
                doc.recieveNoRead += 1
              } else {
                doc.sendNoRead += 1
              }

              doc.save(function (err, chat) {
                if(err || !chat){
                  client.emit("error", {errorMsg: '后端出错'});
                }
            })
             
          }
        });
        }
    });
    });
  })
}
