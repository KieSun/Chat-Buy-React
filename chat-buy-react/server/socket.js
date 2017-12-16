let clients = {};
global.clients = clients;

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
  });
};
