var db = require('../config.js');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: {type: String, required: true, index: {unique: true} },
  email: {type: String, required: true},
  password: {type: String, required: true}
});

var User = mongoose.model('User', userSchema);

User.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = User;