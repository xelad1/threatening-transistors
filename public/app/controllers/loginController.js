angular.module('app.login', [])
.controller('loginController', function($scope, authFactory){
	$scope.username = "";
	$scope.password = ""

	$scope.login = function(){
		authFactory.login($scope.username, $scope.password);
	}
});