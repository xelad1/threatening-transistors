/******************************************************
*  Factory for adding, listing, and processing goals  *
******************************************************/

angular.module('app.goalFact', [])
.factory('goalsService', function($q, $http){

	//creates goal on server

	var createGoal = function(goal){
		return $http({
			method: 'POST',
			url: '/goals',
			data: goal
		}).then(function(res){
			return res.data;
		});
	}

	//stubs - fill out with real data later

	var getGoals = function(user){
	};
	var deleteGoal = function(goal){	
	};

	return {
		createGoal: createGoal,
		getGoals: getGoals,
		deleteGoal: deleteGoal
	};
});