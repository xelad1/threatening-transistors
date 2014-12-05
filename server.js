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

app.listen(3000);
console.log("App listening on port 3000");

//******************************************************************************************
/*

this is the documentation for how to create a message (api_key is legit):
***************
var api_key = 'key-e81b3d37fc5adcc1bc5c21f5267a90d5';
var domain = 'selfinspi.red';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var data = {
  from: 'Excited User <rsison87@gmail.com>',
  to: 'derek.barncard@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness! TEST2!!'
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
});
*/