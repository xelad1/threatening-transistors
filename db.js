var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  password: String
});

var User = mongoose.model('User', userSchema);

var goalsSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  email: String,
  goal: [{ 
    body: String,
    startDate: Date,
    endDate: Date,
    freq: String,
    why: [String]
  }]
})

var Goals = mongoose.model('Goals', goalsSchema);

module.exports = {
  User: User,
  Goals: Goals
};