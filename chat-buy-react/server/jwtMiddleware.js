const jwt = require ('jsonwebtoken');
const key = require ('./key');

module.exports = function (req, res, next) {
  if (req.url === '/login' || req.url === '/register') {
    next ();
    return;
  }
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify (token, key, function (err, decoded) {
      if (err) {
        return res.json ({code: 2, errorMsg: 'token失效'});
      }
      req.decoded = decoded;
      next ();
    });
  } else {
    return res.json ({code: 2, errorMsg: 'token失效'});
  }
};
