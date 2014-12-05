angular.module('app.add', [])
.controller('addGoalController', function('goalsService', $scope){
	$scope.data = {
        freq: {
          daily: false,
          weekly: false,
          monthly: false
        }
      };

  $scope.createGoal = function(goal){
    goalsService.createGoal(goal);
  }
          
  $scope.freqToggle = function(value){
    for (key in $scope.data.freq){
      if (value === key){
        $scope.data.freq[key] = true;
      } else {
        $scope.data.freq[key] = false;
      }
    }
  };
});