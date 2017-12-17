const express = require("express");
const model = require("./model");
const User = model.user;
const AllOrders = model.allOrders;
const Router = express.Router();

Router.get("/allOrders", function(req, res) {
  AllOrders.find({ state: 0 })
    .sort({ date: -1 })
    .exec(function(error, doc) {
      if (error) {
        return res.json({ code: 1, msg: "后端出错" });
      }
      return res.json({ code: 0, data: doc });
    });
});

Router.post("/getOrder", function(req, res) {
  const { orderId } = req.body;
  const { id } = req.decoded;

  AllOrders.findByIdAndUpdate(
    { _id: orderId, state: 0 },
    {
      $set: {
        state: 1,
        deliver: id
      }
    },
    function(error, result) {
      if (error) {
        return res.json({ code: 1, msg: "后端出错" });
      }
      if (!result) {
        return res.json({ code: 1, msg: "该订单已被接单" });
      }
      User.update(
        { _id: id },
        {
          $push: {
            orders: orderId
          }
        },
        function(e, user) {
          if (e || !user) {
            return res.json({ code: 1, msg: "后端出错" });
          }
          let receiver = result.customer;
          if (clients.hasOwnProperty(receiver)) {
            clients[receiver].emit("getOrder", orderId);
          }
          return res.json({ code: 0, msg: "接单成功" });
        }
      );
    }
  );
});

Router.post("/affirm", function(req, res) {
  const { orderId } = req.body;
  const { id } = req.decoded;

  AllOrders.findByIdAndUpdate(
    { _id: orderId, state: 1 },
    {
      $set: {
        state: 2
      }
    },
    function(error, result) {
      if (error) {
        return res.json({ code: 1, msg: "后端出错" });
      }
      if (!result) {
        return res.json({ code: 1, msg: "该订单已完成" });
      }
      let receiver =
        result.deliver === parseInt(id) ? result.customer : result.deliver;
      if (clients.hasOwnProperty(receiver)) {
        clients[receiver].emit("affirmOrder", orderId);
      }
      return res.json({ code: 0, msg: "订单完成" });
    }
  );
});

module.exports = Router;
