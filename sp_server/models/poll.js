const mongoose = require("mongoose");
const User = require("./user");

const pollSchema = new mongoose.Schema({
    title: String,
    options: [{
      text: String,
      count: Number
    }],
    pollAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    voterID: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    voterIP: [String],
    totalCount: Number
});

pollSchema.pre("remove", async function(next){
  try {
    if(this.pollAuthor){
      let foundUser = await User.findById(this.pollAuthor);

      foundUser.pollsCreated.remove(this._id);

      for(var i = 0; foundUser.pollsVoted.length > i; i++){
        if(foundUser.pollsVoted[i] === this._id){
          foundUser.pollsVoted.remove(this._id);
          break;
        };
      };

      this.voterID.forEach(async function(id){
        let foundVoter = await User.findById(id);
        foundVoter.pollsVoted.remove(id);
        await foundVoter.save();
      });

      await foundUser.save();
    };

    return next();
  } catch (err) {
    return next(err);
  }
});

const Poll = mongoose.model("Poll", pollSchema);

module.exports = Poll;
