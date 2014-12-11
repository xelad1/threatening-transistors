/********** Node Modules **************/
var express = require('express');
var session = require('express-session');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');

/********** Helper Files **************/
var db = require('./config.js');
var handler = require('./lib/routehandlers.js');

/********** App setup **************/
var app = express();


/**** App configuration *******/
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(session({
  name: 'thisCookie',
  secret: 'FollowTheHerd',
  resave: false,
  saveUninitialized: true 
}));                  
app.use(cookieParser());    
app.use(methodOverride());          
app.use(passport.initialize());                                 // initializes use of passport
app.use(passport.session());                                    // persistent login sessions
app.use(flash()); 
app.use(express.static(path.join(__dirname, '../public')));

require('./lib/auth.js')(passport);

/********** Routes **************/

app.post('/signup',
  passport.authenticate('local-signup', {
        successRedirect : '/loginSuccess', // redirect to the secure profile section
        failureRedirect : '/signupError', // redirect back to the signup page if there is an error
    })
);
app.get('/signupError', handler.singupError);

app.get('/loginSuccess', handler.loginSuccess);
app.get('/loginError', handler.loginError);
app.post('/login', passport.authenticate('local-login', { 
   successRedirect: '/loginSuccess',
   failureRedirect: '/loginError',
  })
);


app.get('/logout', handler.logout);


app.get('/goals',  handler.getGoals);
app.post('/goals',  handler.addGoal, handler.getGoals);
app.delete('/goals/:id',  handler.removeGoal)


/****** module.exports *********/
module.exports = app
