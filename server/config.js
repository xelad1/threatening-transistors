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



var goalsSchema = new Schema({
  //TODO: putting the goals into userID
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  email: String,
  goals: [{ 
    content: String,
    startDate: Date,
    endDate: Date,
    freq: String,
    why: [String]
  }]
})

///* Old services file ****/

var Goals = mongoose.model('Goals', goalsSchema);

module.exports = {
  User: User,
  Goals: Goals
};


db.User.find({name:"hello"}).exec(function(err, result) {
  if (!err) {
    console.log(result);
  } else {
    console.log("error");
  }
});

                          
var goals = [];

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
  name: "Marcus",
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
  to: 'derek.barncard@gmail.com',
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


/**** Former Services.js file ********/

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
