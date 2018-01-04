
const model = require("./model");
const foods = require("./foods.json");
const User = model.user;
const AllOrders = model.allOrders;


module.exports = function(app) {
  // 获取商品列表
  app.get("/goods/list", function(req, res) {
    return res.json({ code: 0, data: foods.list });
  });
  // 购买商品
  app.post("/goods/buy", function(req, res) {
    const { id } = req.decoded;
    const { buyList } = req.body;
    let price = 0;
    let count = 0;
    let desc = "";
    buyList.forEach(v => {
      price += v.price * v.count;
      count += v.count;
      if (!desc) {
        desc = foods.list.find(food => {
          return food.id === v.id;
        }).name;
      }
    });
    const order = {
      price,
      count,
      state: 0,
      desc,
      customer: id
    };
    const model = new AllOrders(order);
    model.save(function(error, data) {
      if (error || !data) {
        return res.status(500).json({ msg: "后端出错" });
      }

      User.update(
        { _id: id },
        {
          $push: {
            orders: data._id
          }
        },
        function(e, user) {
          if (e || !user) {
            return res.status(500).json({ msg: "后端出错" });
          }

          return res.status(200).json({ code: 0, msg: "购买成功" });
        }
      );
    });
  });
}
