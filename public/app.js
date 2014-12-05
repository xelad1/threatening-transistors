angular.module('app', ['ui.router'])
.config(function($stateProvider) {
	$stateProvider
  .state('addGoalState', {
    url: "",
    views: {
      "addGoal": { 
        templateUrl: "/app/views/addGoal.template.html" ,
        controller: function($scope) {
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

        }
      },
      "goalsList": {
        templateUrl: "/app/views/goalsView.template.html",
        controller: function($scope) {
          
        }
      }
    }
  })
})