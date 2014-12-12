var passport = require('passport');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var schedule = require('node-schedule');
var Goal = require('../models/goal.js')
var db = require('../config.js');
var Goal = require('../models/goal.js');
var emailHandler = require('./emailHandler.js');
var request = require('request')



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
  res.clearCookie('thisCookie');
  req.session.destroy(function(err) {
      req.logout();
      res.send('loggedOut')
  });
};

exports.getGoals = function (req, response) {
  Goal.find({userId: req.session.passport.user}).exec(function(err, result) {
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

  Goal.findOne({'userId': req.session.passport.user}, function(err, goals){
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

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

exports.payments = function (req, res) {
  request.post(
    'https://api.venmo.com/v1/oauth/access_token',
    { form: {"client_id": 2195,
    "client_secret": '4VUeNAwGEkbQWj8GywqYGBXygRBzWTrJ',
    "code": req.body.code
    } }, function (error, response, body) {
      if(error) {
        console.log(error);
        res.status(404).send('no good');
      }
      else{
        req.session.accessToken = JSON.parse(body).access_token;
        if(JSON.parse(body).user) {
          req.session.venmoID = JSON.parse(body).user.id;
        }
        res.send(body);
      }
    })
}

exports.schedulePay = function (req, res) {
  console.log(req.body)
  var amount = req.body.amount;
  var receiverId = req.body.receiverID;
  var paymentReq = {"access_token": req.session.accessToken,
    user_id: receiverId,
    note: 'I did not meet my goal on time :(',
    amount: amount
    }
    console.log(paymentReq);
    request.post(
    'https://api.venmo.com/v1/payments',
    { form: paymentReq}, function (error, response, body) {
      if(error) {
        console.log(error);
        res.status(404).send('no good');
      }
      else{
        console.log(body);
        res.send('Payment Completed');
      }
    })
}

exports.getFriends = function (req, res) {
  var requestURL = 'https://api.venmo.com/v1/users/' + req.session.venmoID + '/friends?access_token=' + req.session.accessToken + '&&limit=300';
  request.get(
    requestURL, function (error, response, body) {
      if(error) {
        console.log(err)
        res.status(404);
        return;
      }
        var friends = JSON.parse(body).data;
        res.send(friends);
    });
}

exports.addGoal = function (req, res) {
  var goalData = req.body;
  var name = req.session.name;
  var email = req.session.email;
  //check to see if user is already in goal database (has already saved at least one goal)
  Goal.findOne({'userId': req.session.passport.user}, function(err, userGoalList){

    //if no goals in goal db create new goal for user
    if(!userGoalList){
      Goal.create({
        userId: req.session.passport.user,
        goals: [goalData]
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
        emailHandler(goalData, email);
        res.send("Goal Added to existing goals successfully");
      });
    }
  });

  

};
