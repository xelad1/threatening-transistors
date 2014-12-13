var fs = require('fs');
var nunjucks = require('nunjucks');
var schedule = require('node-schedule');
var api_key = 'key-e81b3d37fc5adcc1bc5c21f5267a90d5';
var domain = 'selfinspi.red';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var path = require('path')

module.exports = function (goalData, username, email) {
  DifferNumDays = Math.floor(((new Date(goalData.endDate.valueOf()) - new Date(goalData.startDate.valueOf()))/(24*60*60*1000)));

  var whyIdx = Math.floor(Math.random()*goalData.why.length);

  var emailDataInfo = {
    name: username,
    goal: goalData.content,
    daysAway: DifferNumDays +' days',
    reason: goalData.why[whyIdx]
  }

  // sends email on post request... this was put here for testing reasons. It should ideally grab from the database and send out according to time.
  var htmlPath = path.join(__dirname,'../../email/emailTemplate.html'); 
  var htmlContent = fs.readFileSync(htmlPath,'utf8');
  var response = nunjucks.renderString(htmlContent, emailDataInfo);
  var emailData = {
    from: 'Selfinspi.red <selfinspi.red@gmail.com>',
    to: 'nballaney@gmail.com',
    subject: "Don't Forget What's Important",
    html: response
  };
  var date = new Date(2014, 12, 11, 20, 54, 0); // will send an email at this time this data used for testing purposes


  var j = schedule.scheduleJob(date, function(){
    mailgun.messages().send(emailData, function (error, body) {
  });
  });

}
