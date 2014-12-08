var getGoals = function(id_user){
	db.Goals.find({userId:id_user}).exec(function(err, result) {
	  if (!err) {
	    console.log(result);
	    return result;
	  } else {
	    console.log("error");
	  }
	});
}



module.exports = {
	getGoals: getGoals
};