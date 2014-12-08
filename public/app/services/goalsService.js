/******************************************************
*  Factory for adding, listing, and processing goals  *
******************************************************/

angular.module('app.goalFact', [])
.factory('goalsService', function($q, $http){
	var createGoal = function(goal){
		return $http({
			method: 'POST',
			url: '/tasks',
			data: goal
		}).then(function(res){
			return res.data;
		});
	}
	return {
		createGoal: createGoal
	};
});