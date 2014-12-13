/*******************************************
*  Setup for app main and ui-router routes *
*******************************************/

angular.module('app', ['app.location', 'ui.router', 'app.signup', 'app.login', 'app.add', 'app.goals','app.logout',  'app.authFact',   'app.goalFact'])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/login");

	$stateProvider
  .state('addGoalState', {
    url: "/profile",
    views: {
      "addGoal": { 
        templateUrl: "/app/views/addGoal.template.html" ,
        controller: "addGoalController"
      },
      "reasons@addGoalState": {
        templateUrl: "/app/views/reasonsView.template.html"
      },
      "payment@addGoalState": {
        templateUrl: "app/views/paymentView.template.html"
      },
      "goalsList": {
        templateUrl: "/app/views/goalsView.template.html",
        controller: "goalsListController"
      },
      "geoLocation": {
        templateUrl: "/app/views/geolocationTester.html",
        controller: "geolocationController"
      }
    }
  })
  .state('loginState', {
    url:'/login',
    views: {
      'authPane': {
        templateUrl: '/app/views/loginView.template.html',
        controller: 'loginController'
      }
    }
  })
  .state('signupState', {
    url:'/signup',
    views: {
      'authPane': {
        templateUrl: '/app/views/signupView.template.html',
        controller: 'signupController'
      }
    }
  })
  
});