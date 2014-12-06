angular.module('app.add', [])
.controller('addGoalController', function(goalsService, $scope){
	$scope.data = {
        goal: {
          goal: "",
          endDate: "",
          why: "",
          freq: {
            daily: false,
            weekly: false,
            monthly: false
          }
        }
      };

  $scope.createGoal = function(){
    var input = $scope.prepareData($scope.data.goal);
    console.log(input);
    goalsService.createGoal($scope.data.goal).then(function(res){
      console.log(res);
      $scope.showCreateSuccess();
    });
  }

  //prepares data to be sent to the server. the server is
  //expecting different values the input provides

  $scope.prepareData = function (data) {
    var prepared = {};

    prepared.content = data.goal;
    prepared.startDate = new Date();
    prepared.endDate = $scope.picker.get('select').obj; //make utc
    prepared.why = data.why; //need to adjust to array

    for (key in data.freq){
      if (data.freq[key]){
        prepared.freq = key;
      }
    }
    return prepared;
  }

  $scope.showCreateSuccess = function(){
    console.log($('.dimmer'));
    $('.dimmer').dimmer('show');
    setTimeout(function(){
      $('.dimmer').dimmer('hide');
    }, 2000);
  };
          
  $scope.freqToggle = function(value){
    for (key in $scope.data.goal.freq){
      if (value === key){
        $scope.data.goal.freq[key] = true;
      } else {
        $scope.data.goal.freq[key] = false;
      }
    }
  };

  $scope.$on('$viewContentLoaded', function(){
    var $input = $('.datepicker').pickadate();
    $scope.picker = $input.pickadate('picker')
  });

});