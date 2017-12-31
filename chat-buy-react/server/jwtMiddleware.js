const jwt = require("jsonwebtoken");
const key = require("./key");

// token 中间件 在请求过来时统一判断 token 是否失效
module.exports = function(req, res, next) {
  if (req.url === "/login" || req.url === "/register") {
    next();
    return;
  }
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, key, function(err, decoded) {
      if (err) {
        return res.json({ code: 2, errorMsg: "token失效" });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.json({ code: 2, errorMsg: "token失效" });
  }
};
