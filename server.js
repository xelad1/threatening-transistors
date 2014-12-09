//server stuff goes here!
var express = require('express');
var session = require('express-session');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var chalk = require('chalk');
var passport = require('passport');
var flash = require('connect-flash');
var methodOverride = require('method-override');
var schedule = require('node-schedule');
var mongoose = require('mongoose');
var db = require('./db');
var fs = require('fs');
var nunjucks = require('nunjucks');
var services = require('./Services');

// MONGOOSE
mongo_uri = process.env.MONGO_URI || 'mongodb://threatening:transistors@ds061360.mongolab.com:61360/heroku_app32253810';
mongoose.connect(mongo_uri);
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function callback () {
  console.log("Successful connection to database");
});

db.User.find({name:"hello"}).exec(function(err, result) {
  if (!err) {
    console.log(result);
  } else {
    console.log("error");
  }
});


//for email
var api_key = 'key-e81b3d37fc5adcc1bc5c21f5267a90d5';
var domain = 'selfinspi.red';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
//// for email
var app = express();                                            //  setup express server
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(session({ secret: 'DeRaNiRa' }));                       // session secret
app.use(passport.initialize());
app.use(passport.session());                                    // persistent login sessions
app.use(flash());                                               // use connect-flash for flash messages stored in session
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));


require('./passport')(passport);                                // pass passport for configuration
//require('./app/routes.js')(app, passport);

var goals = [];

app.set()
//tasks array for testing

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/login', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


app.get('/login', function(req,res) {
  res.send('SUCCESSFUL SIGNUP');
  });

//.authenticate with local-sign from passport on a post request on logon page.
app.post('/login', passport.authenticate('local-login', { 
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash : true // allow flash messages
  })
);

//on logout this will call the logout function and terminate users current session.
app.get('/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout(); //implement
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});

//deletes user id on a delete request on the /goals/:id url. 
app.delete('/goals/:id', function(req, res) {
  db.Goals.findOne({'userId': req.session.userId}, function(err, goals){
    if(goals.length <= req.params.id){
      res.statusCode = 404;
      return res.send('Error 404: No goal found');
    }else{
      goals.goals.splice(req.params.id, 1);
      goals.save(function(err){
        if(err){
          res.send(err);
        }
      res.status(201).send("Goal deleted successfully");
      });
    }
  })
});  

app.get('/goals',function(req,res){
  services.getGoals(req.session.userId,res);
})

app.post('/goals', function(req,res){
	//goals.push(req.body);
  //console.log('req.body: ', req.body);
  var goalData = req.body;
  console.log('req.body: ', req.body);
  var goalText= goalData.goalContent;
  var startDate = goalData.startDate;
  var dueDate = goalData.endDate;
  var why = goalData.why; 
  var freq;
  for(var key in goalData.freq){
    if(goalData.freq[key]){
      freq = key;
    }
  }
  //check to see if user is already in goal database (has already saved at least one goal)
  db.Goals.findOne({'userId': req.session.userId }, function(err, goals){
    //if no goals in goal db create new goal for user
    if(!goals){
      db.Goals.create({
        userId: '1',// <--replace with: req.session.userId,
        goals: [goalData]
      }, function(err, goal){
        if(err){
          res.send(err);
        }
      });
      res.status(201).send("Users first goal added to database successfully");
    }else{

      goals.goals.push(goalData); //push to array within goals ie, goals.goal.push(xxx)
      goals.save(function(err){
        if(err){
          res.send(err);
        }
      res.status(201).send("Goal Added to existing goals successfully");
      });
    }
  });

// will send an email to user on post request /goals  
DifferNumDays = ((new Date(goalData.endDate.valueOf()) - new Date(goalData.startDate.valueOf()))/(24*60*60*1000));
DifferNumDays = Math.floor(DifferNumDays);
console.log(DifferNumDays,"worked");  
// Generates a random index to email one of the reasons that the user has set.
var whyIdx = Math.floor(Math.random()*why.length);
console.log(whyIdx);
  var testData = {
  name: "Rachel",
  goal: goalData.content,
  daysAway: DifferNumDays +' days',
  reason: why[whyIdx]
}
// sends email on post request... this was put here for testing reasons. It should ideally grab from the database and send out according to time.
var htmlPath = './public/emailTemplate.html'; 
var htmlContent = fs.readFileSync(htmlPath,'utf8');
var response = nunjucks.renderString(htmlContent, testData);
var emailData = {
  from: 'Selfinspi.red <selfinspi.red@gmail.com>',
  to: 'hazeeee@gmail.com',
  subject: "Don't Forget What's Important",
  html: response
};
var date = new Date(2014, 11, 04, 22, 54, 0); // will send an email at this time this data used for testing purposes


var j = schedule.scheduleJob(date, function(){
  mailgun.messages().send(emailData, function (error, body) {
  console.log(body);
});
});
// end of email to user on post request

})


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function(){
  console.log("Applet listening on port " + process.env.PORT);
});










