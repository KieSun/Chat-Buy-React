let clients = {};
global.clients = clients;
const model = require("./model");
const User = model.user;

module.exports = function() {
  io.on("connection", function(client) {
    client.emit("open");
    client.on("user", user => {
      clients[user] = client;
      current = user;
    });
    client.on("disconnect", function() {
      delete clients.current;
    });
    client.on("getUserName", id => {
      User.findOne({ _id: id }, (error, user) => {
        // if (!user) {
        //   client.emit("userName", null);
        // } else {
        //   client.emit("userName", user.user);
        // }
        console.log(user.user);
        client.emit("userName", user.user);
      });
    });
  });
};
