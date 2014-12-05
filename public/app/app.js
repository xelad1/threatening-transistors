angular.module('app', ['ui-router'])
.config(function($stateProvider) {
	$stateProvider
  .state('index', {
    url: "",
    views: {
      "addGoal": { 
        templateUrl: "/views/addGoal.template.html" 
      },
      "goalsList": { 
        templateUrl: "/views/goalsList.template.html" 
      }
    }
  })
})