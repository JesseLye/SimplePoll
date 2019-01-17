const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/VoteOrDie", {
  keepAlive: true
});

module.exports.User = require("./user");
module.exports.Poll = require("./poll");
