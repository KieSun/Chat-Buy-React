const model = require("./model");
const User = model.user;
const key = require("./key");
const jwt = require("jsonwebtoken");

module.exports = function(app) {
  // 注册
  app.post("/user/register", function(req, res) {
    const { user, pwd, type } = req.body;
    User.findOne({ user }, function(e, doc) {
      if (doc) {
        return res.status(200).json({ code: 1, msg: "已存在该用户" });
      }
      const model = new User({ user, pwd, type });
      model.save(function(error, doc) {
        if (error || !doc) {
          return res.status(500).json({ msg: "后端出错" });
        }
        const { user, type, _id } = doc;
        // 保持登录状态7天
        const token = jwt.sign({ id: _id }, key, {
          expiresIn: 60 * 60 * 24 * 7
        });
        return res.status(200).json({ code: 0, token, data: { user, type, id: _id } });
      });
    });
  });
  // 登录
  app.post("/user/login", function(req, res) {
    const { user, pwd } = req.body;
    User.findOne({ user, pwd }, { pwd: 0 }, function(e, doc) {
      if (!doc) {
        return res.status(200).json({ code: 1, msg: "用户名或密码错误" });
      }
      if (e) {
        return res.status(500).json({ msg: "后端出错" });
      }
      const { user, type, _id } = doc;
      const token = jwt.sign({ id: _id }, key, {
        expiresIn: 60 * 60 * 24 * 7
      });
      return res.status(200).json({ code: 0, data: { user, type, id: _id }, token });
    });
  });
  // 获取登录信息
  app.post("/user/info", function(req, res) {
    const { id } = req.decoded;
    User.findOne({ _id: id }, function(e, user) {
      if (!user) {
        return res.status(401).json({ msg: "token 失效" });
      }
      if (e) {
        return res.status(500).json({ msg: "后端出错" });
      }
      return res.json({
        code: 0,
        data: {
          user: user.user,
          type: user.type,
          id: user.id
        }
      });
    });
  });
  // 获取订单
  app.post("/user/orders", function(req, res) {
    const { id } = req.decoded;

    User.findOne({ _id: id })
      .populate({ path: "orders", options: { sort: { date: -1 } } })
      .exec(function(error, user) {
        if (error) {
          return res.status(500).json({ msg: "后端出错" });
        }
        if (!user) {
          return res.status(200).json({ code: 1, errorMsg: "找不到该用户" });
        }

        return res.status(200).json({ code: 0, data: user.orders });
      });
  });
}
