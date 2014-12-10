var passport = require('passport');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var Goal = require('../models/goal.js')
var db = require('../config.js');
var Goal = require('../models/goal.js');
var emailHandler = require('./emailHandler.js');



exports.singupError = function (req, res) {
  res.status(404)
  res.send('Your signup details were either invalid or a duplicate of an existing user. Please try again')
}

exports.loginSuccess = function (req, res) {
  res.status(200)
  res.send('Login was successful')
}

exports.loginError = function (req, res) {
  res.status(404)
  res.send('404- Your login details were incorrect. Please try again')
}


exports.logout = function (req, res) {
  req.session.destroy(function (err) {
    req.send("successful logout")
  })
};

exports.getGoals = function (req, response) {
  console.log(req.session);
  Goal.find({userId: req.session._id}).exec(function(err, result) {
      if (!err) {
        response.send(result)
      } else {
        console.log('err');
      }
    });
};

exports.removeGoal = function (req, res) {
  var name = req.session.name;
  var email = req.session.email;

  Goal.findOne({'userId': req.session._id}, function(err, goals){
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
  var name = req.session.name;
  var email = req.session.email;
  console.log(req.session)
  //check to see if user is already in goal database (has already saved at least one goal)
  Goal.findOne({'userId': req.session._id}, function(err, userGoalList){
    //if no goals in goal db create new goal for user
    if(!userGoalList){
      Goal.create({
        userId: req.session._id,
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

  emailHandler(goalData, email);

};
