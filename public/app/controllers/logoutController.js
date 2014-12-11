angular.module('app.logout', [])
.controller('logoutController', function($scope, authFactory){
  $scope.logout = function () {
    authFactory.logout();
  }

});