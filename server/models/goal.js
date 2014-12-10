var db = require('../config.js');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var User = require('./user.js')

var goalSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: User},
  email: String,
  goals: [{ 
    content: String,
    startDate: Date,
    endDate: Date,
    freq: String,
    why: [String]
  }]
});

var Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;