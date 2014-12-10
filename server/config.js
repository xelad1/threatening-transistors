var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

mongoURI = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://threatening:transistors@ds061360.mongolab.com:61360/heroku_app32253810';
mongoose.connect(mongoURI);

// Run in seperate terminal window using 'mongod'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open');
});

module.exports = db;
