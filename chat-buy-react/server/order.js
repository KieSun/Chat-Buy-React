const model = require("./model");
const async = require("async");
const User = model.user;
const AllOrders = model.allOrders;

module.exports = function(app) {
  // 获取所有可接订单
  app.get("/order/allOrders", function(req, res) {
    AllOrders.find({ state: 0 })
      .sort({ date: -1 })
      .exec(function(error, doc) {
        if (error) {
          return res.status(500).json({ msg: "后端出错" });
        }
        return res.json({ code: 0, data: doc });
      });
  });
  // 接单
  app.post("/order/getOrder", function(req, res) {
    const { orderId } = req.body;
    const { id } = req.decoded;
    // 同步 先找到订单并更新订单状态然后再将订单 push 到用户的所有订单数组中
    async.waterfall(
      [
        function(callback) {
          AllOrders.findOneAndUpdate(
            { _id: orderId, state: 0 },
            {
              $set: {
                state: 1,
                deliver: id
              }
            },
            function(error, order) {
              if (error) {
                callback(error, null);
              }
              if (!order) {
                return res.status(200).json({ code: 1, msg: "该订单已被接单" });
              }
              callback(null, order);
            }
          );
        },
        function(order, callback) {
          User.update(
            { _id: id },
            {
              $push: {
                orders: orderId
              }
            },
            function(e, user) {
              if (e || !user) {
                callback(e, null);
              }
              // 如果对方用户在线，发送接单信息
              let receiver = order.customer;
              if (clients.hasOwnProperty(receiver)) {
                io.to(clients[receiver]).emit("getOrder", {
                  orderId,
                  id
                });
              }
              callback(null, null);
            }
          );
        }
      ],
      function(err, result) {
        if (err) {
          return res.status(500).json({ msg: "后端出错" });
        }
        return res.status(200).json({ code: 0, msg: "接单成功" });
      }
    );
  });
  // 确认订单
  app.post("/order/affirm", function(req, res) {
    const { orderId } = req.body;
    const { id } = req.decoded;

    AllOrders.findOneAndUpdate(
      { _id: orderId, state: 1 },
      {
        $set: {
          state: 2
        }
      },
      function(error, result) {
        if (error) {
          return res.status(500).json({ msg: "后端出错" });
        }
        if (!result) {
          return res.status(200).json({ code: 1, msg: "该订单已完成" });
        }
        // 如果对方用户在线，发送确认订单信息
        let receiver = result.deliver == id ? result.customer : result.deliver;
        if (clients.hasOwnProperty(receiver)) {
          io.to(clients[receiver]).emit("affirmOrder", orderId);
        }
        return res.status(200).json({ code: 0, msg: "订单完成" });
      }
    );
  });
}
