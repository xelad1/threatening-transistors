//server stuff goes here!
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var chalk = require('chalk');

var app = express(); //  setup express server
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(express.static(__dirname + '/public'));


//mongoose.connect(//mongo server);

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

app.post('/login', passport.authenticate('local-signin', { 
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

app.get('/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});

app.post('/singup')

app.listen(3000);
console.log("App listening on port 3000");
