var passport = require('passport');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var Goal = require('../models/goal.js')
var db = require('../config.js');
var Goal = require('../models/goal.js');
var emailHandler = require('.lib/emailHandler.js');


exports.signupHandler = function () {passport.authenticate('local-signup', {
    successRedirect : '/loginSuccess', // redirect to the secure profile section
    failureRedirect : '/signupError', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
})};

exports.signupError = function () {
  res.status(404)
  res.send('Your signup details were either invalid or a duplicate of an existing user. Please try again')
}

exports.loginSuccess = function (req, res) {
  res.status(200)
  res.send('Login was successfull')
}

exports.loginError = function (req, res) {
  res.status(404)
  res.send('Your login details were incorrect. Please try again')
}

exports.loginHandler = function () {
  passport.authenticate('local-login', { 
   successRedirect: '/loginSuccess',
   failureRedirect: '/loginError',
   failureFlash : true // allow flash messages
  });
}

exports.logout = function (req, res) {
  req.session.destroy(function (err), {
    req.send("successful logout")
  })
});

exports.getGoals = function (req, response) {
  Goal.find({userId:req.session.userId}).exec(function(err, result) {
      if (!err) {
        console.log(result);
        response.send(result)
      } else {
        console.log('err');
      }
    });
};


exports.addGoal = function () {};

exports.removeGoal = function (req, res) {
  Goal.findOne({'userId': req.session.userId}, function(err, goals){
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
};

exports.addGoal = function (req, res) {
  var goalData = req.body;
  var name = req.session.name || 'Marcus'
  
  //check to see if user is already in goal database (has already saved at least one goal)
  Goal.findOne({'userId': req.session.userId }, function(err, userGoalList){
    //if no goals in goal db create new goal for user
    if(!userGoalList){
      Goal.create({
        userId: req.session.userId,
        goals: goalData
      }, function(err, goal){
        if(err){
          res.send(err);
        }
      });
      res.status(201).send("Users first goal added to database successfully");
    }else{
      userGoalList.goals.push(goalData); //push to array within goals ie, goals.goal.push(xxx)
      userGoalList.save(function(err){
        if(err){
          res.send(err);
        }
      res.status(201).send("Goal Added to existing goals successfully");
      });
    }
  });

  email.handler(goalData, name);
  
};
