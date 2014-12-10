var db = require('../config.js');
var crypto = require('crypto');
var mongoose = require('mongoose');

var goalSchema = mongoose.Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  email: String,
  goals: [{ 
    content: String,
    startDate: Date,
    endDate: Date,
    freq: String,
    why: [String]
  }]
});

//TODO: putting the goals into userID

var Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;


var db = require('./db');

//grab goals according to user id
var getGoals = function(id_user, response){
  db.Goals.find({userId:id_user}).exec(function(err, result) {
    if (!err) {
      console.log(result);
      response.send(result)
    } else {
      console.log('err');
    }
  });
}

module.exports = {
  getGoals: getGoals
};
