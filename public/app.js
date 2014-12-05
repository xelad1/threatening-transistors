angular.module('app', ['ui.router'])
.config(function($stateProvider) {
	$stateProvider
  .state('addGoalState', {
    url: "",
    views: {
      "addGoal": { 
        templateUrl: "/app/views/addGoal.template.html" ,
        controller: function($scope) {

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