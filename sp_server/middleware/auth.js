require("dotenv").load();
var jwt = require("jsonwebtoken");

exports.loginRequired = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded) {
        next();
      } else {
        return next({ status: 401, message: "Please Log In First" });
      }
    });
  } catch (err) {
    return next({ status: 401, message: "Please Log In First" });
  }
};

exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded && decoded.id === req.params.user_id) {
        return next();
      } else {
        return next({ status: 401, message: "Unauthorized" });
      }
    });
  } catch (err) {
    return next({ status: 401, message: "Unauthorized" });
  }
};
