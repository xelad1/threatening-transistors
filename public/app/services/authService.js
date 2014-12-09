/*****************************************************
*  Factory for login / logout / and persistent auth  *
*****************************************************/

angular.module('app.authFact', [])
.factory('authFactory', function($q, $http, $location){

	var loggedInUser = null;

	var login = function(email, password){
		console.log("authFactory getting email: " + email + ", password: " + password);
		return $http({
			method: 'POST',
			url: '/login',
			data: {email: email, password: password}
		}).then(function(res){
			console.log(res.data);
			$location.url("/");
		});
	}

	var getLogin = function(){
		console.log("authFactory getting success message");
		return $http({
			method: 'GET',
			url: '/login'
		}).then(function(res){
			$location.url("/");

		});
	}


	var signup = function(email, name, password){
		console.log("authFactory signup getting email: " + email + ", name: " + name + ", password: " + password);
		return $http({
			method: 'POST',
			url: '/signup',
			data: {email: email, name: name, password: password}
		}).then(function(res){
			console.log(res.data);
			$location.url("/");
		});
	}

	return {
		getLogin: getLogin,
		login: login,
		signup: signup,
		loggedInUser: loggedInUser
	}
});