const db = require("../models");
var jwt = require("jsonwebtoken");

exports.onGetPoll = async function(req, res, next){
  try {
    const foundPoll = await db.Poll.findById(req.params.id, "_id title options pollAuthor")
                                    .populate({
                                      path: "pollAuthor",
                                      select: "username"
                                    })
                                    .exec();

    return res.status(200).json(foundPoll);
  } catch (err) {
    return next(err);
  };
};

exports.onCreatePoll = async function(req, res, next){
  try {
    var convertJSON = JSON.parse(req.body.jsonState);
    var newArr = [];

    for(var i = 0; convertJSON["options"].length > i; i++){
      if(convertJSON["options"][i] !== ""){
        newArr.push({
          text: convertJSON["options"][i],
          count: 0
        });
      }
    }

    if (newArr.length <= 1){
      return next({status: 403, message: "At least 2 options are required."});
    } else if (convertJSON["title"].length === 0){
      return next({status: 403, message: "Poll must have title."})
    }

    var poll = await db.Poll.create({
      title: convertJSON["title"],
      options: [...newArr]
    });

    if(req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      var decoded = jwt.verify(token, process.env.SECRET_KEY);
      if(decoded) {

        let foundAuthor = await db.User.findById(decoded.id);
        foundAuthor.pollsCreated.push(poll._id);
        await foundAuthor.save();

        poll.pollAuthor = decoded.id;
        await poll.save();

        let newPoll = await db.Poll.findById(poll._id)
                                   .populate({
                                     path: "pollAuthor",
                                     select: "username"
                                   });

        return res.status(200).json(newPoll);
      }
    }

    return res.status(200).json(poll);
  } catch (err) {
    return next(err);
  }
};

exports.onVotePoll = async function(req, res, next){
  try {
    var updateComplete = false;
    var foundPoll = await db.Poll.findById(req.params.id);
    for(var i = 0; foundPoll.voterIP.length > i; i++){
      if(foundPoll.voterIP[i] == req.ip){
        return next({
          status: 403,
          message: "Vote already submitted"
        });
      };
    };

    if(req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      var decoded = jwt.verify(token, process.env.SECRET_KEY);
      if(decoded) {
        let foundAuthor = await db.User.findById(decoded.id);
        for(var j = 0; foundAuthor.pollsCreated.length > j; j++){
          if(foundAuthor.pollsVoted[j] == foundPoll._id){
            return next({
              status: 403,
              message: "Vote already submitted"
            });
          };
        };

        foundAuthor.pollsVoted.push(foundPoll._id);
        foundPoll.voterID.push(decoded.id);
        await foundAuthor.save();

      };
    };

    for(var k = 0; foundPoll.options.length > k; k++){
      if(foundPoll.options[k]._id == req.body.options_id){
        foundPoll.options[k].count++;
        foundPoll.voterIP.push(req.ip);
        updateComplete = true;
      };
    };

    if(!updateComplete){
      return next({
        status: 401,
        message: "Something went wrong."
      });
    };

    await foundPoll.save();

    return res.status(200).json(foundPoll);
  } catch (err) {
    return next(err);
  };
};

exports.onDeletePoll = async function(req, res, next){
  try {
    let deletePoll = await db.Poll.findById(req.params.id);
    var convertToString = deletePoll.pollAuthor.toString();

    if(req.params.user_id !== convertToString){
      return next({
        status: 401,
        message: "Unauthorized"
      });
    };

    await deletePoll.remove();

    return res.status(200).json(deletePoll);
  } catch (err) {
    return next(err);
  };
};
