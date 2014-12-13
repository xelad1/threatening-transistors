angular.module('app.location',['geolocation'])
  .controller('geolocationController', function ($scope, geolocation) {
    console.log("getting into controller...");
    geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
    });
});
