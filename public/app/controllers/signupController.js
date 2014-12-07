angular.module('app.signup', [])
.controller('signupController', function($scope, authFactory){
	$scope.email = "";
	$scope.name = ""
	$scope.password = ""

	$scope.signup = function(){
		authFactory.signup($scope.email, $scope.name, $scope.password);
	}
});