var fs = require('fs');
var nunjucks = require('nunjucks');
var schedule = require('node-schedule');

module.exports = function (goalData, username) {
  DifferNumDays = Math.floor(((new Date(goalData.endDate.valueOf()) - new Date(goalData.startDate.valueOf()))/(24*60*60*1000)));

  var whyIdx = Math.floor(Math.random()*goalData.why.length);

  var emailData = {
    name: username,
    goal: goalData.content,
    daysAway: DifferNumDays +' days',
    reason: goalData.why[whyIdx]
  }
  // sends email on post request... this was put here for testing reasons. It should ideally grab from the database and send out according to time.
  var htmlPath = './public/emailTemplate.html'; 
  var htmlContent = fs.readFileSync(htmlPath,'utf8');
  var response = nunjucks.renderString(htmlContent, testData);
  var emailData = {
    from: 'Selfinspi.red <selfinspi.red@gmail.com>',
    to: 'lizckc2000@hotmail.com',
    subject: "Don't Forget What's Important",
    html: response
  };
  var date = new Date(2014, 11, 04, 22, 54, 0); // will send an email at this time this data used for testing purposes


  var j = schedule.scheduleJob(date, function(){
    mailgun.messages().send(emailData, function (error, body) {
    console.log(body);
  });
  });

}
