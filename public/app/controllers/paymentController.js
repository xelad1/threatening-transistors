  angular.module('app.payments', [])
.controller('paymentController', function(goalsService, $scope, $rootScope){
  
  $scope.setupPayment = function () {}
    // sends payment to friend through venmo
    // redirect to https://api.venmo.com/v1/oauth/authorize?client_id=CLIENT_ID&scope=make_payments%20access_profile
  });