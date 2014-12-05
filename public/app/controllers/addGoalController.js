angular.module('app.add', [])
.controller('addGoalController', function($scope){
	$scope.data = {
        freq: {
          daily: false,
          weekly: false,
          monthly: false
        }
      };
          
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