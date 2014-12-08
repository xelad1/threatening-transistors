/*******************************************
*  Controller for the login template       *
*******************************************/

angular.module('app.login', [])
.controller('loginController', function($scope, authFactory){
	$scope.email = "";
	$scope.password = ""

	//Calls factory login function

	$scope.login = function(){
		authFactory.login($scope.email, $scope.password);
	}
});