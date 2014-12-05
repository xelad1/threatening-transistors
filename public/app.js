angular.module('app', ['ui.router'])
.config(function($stateProvider) {
	$stateProvider
  .state('addGoalState', {
    url: "",
    views: {
      "addGoal": { 
        templateUrl: "/app/views/addGoal.template.html" 
      }
    }
  })

  .state('goalsListState', {
    url: "",
    views: {
      "goalsList": {
        templateUrl: "/app/views/addGoal.template.html" 
      }
    }
  })
})