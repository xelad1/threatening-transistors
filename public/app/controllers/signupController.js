/*******************************************
*  Controller for the signup template    *
*******************************************/

angular.module('app.signup', [])
.controller('signupController', function($scope, authFactory){
	$scope.email = "";
	$scope.name = ""
	$scope.password = ""

	//Calls factory signup function

	$scope.signup = function(){
		authFactory.signup($scope.email, $scope.name, $scope.password);
	}
});