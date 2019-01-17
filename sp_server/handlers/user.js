const db = require("../models");
var jwt = require("jsonwebtoken");

exports.onGetDashboard = async function(req, res, next){
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, process.env.SECRET_KEY);

    let foundUser = await db.User.findById(decoded.id, "username pollsCreated pollsVoted")
                                 .populate({
                                   path: "pollsCreated pollsVoted",
                                   select: ["title", "pollAuthor"],
                                   options: {
                                     sort: { createdAt: "desc" }
                                   }
                                 });

    return res.status(200).json(foundUser);
  } catch (err) {
    return next(err);
  };
};
