const jwt = require("jsonwebtoken");
const key = require("./key");

// token 中间件 在请求过来时统一判断 token 是否失效
module.exports = function(options) {
  // 备用参数
  options = options || {}
  
  return function(req, res, next) {
    if (req.url === "/user/login" || req.url === "/user/register") {
      next();
      return;
    }

    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (token) {
      jwt.verify(token, key, function(err, decoded) {
        if (err) {
          return res.status(401).json({ errorMsg: "token失效" });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(401).json({ errorMsg: "token失效" });
    }
  }
}
