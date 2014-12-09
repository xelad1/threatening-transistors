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