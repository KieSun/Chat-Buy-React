const user = require("./user");
const goods = require("./goods");
const order = require("./order");
const chat = require("./chat");


module.exports = function(app) {
  [
    user,
    goods,
    order,
    chat
  ].forEach((p) => {
    p(app);
  })
}