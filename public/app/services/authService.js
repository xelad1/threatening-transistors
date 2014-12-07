angular.module('app.authFact', [])
.factory('authFactory', function($q, $http){
	var login = function(username, password){
		console.log("authFactory getting username: " + username + ", password: " + password);
		return $http({
			method: 'POST',
			url: '/login',
			data: {username: username, password: password}
		}).then(function(res){
			console.log(res);
		});
	}
	return {
		login: login
	}
});