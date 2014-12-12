/*******************************************
*  Controller for the addGoals template    *
*******************************************/

angular.module('app.add', [])
.controller('addGoalController', function(goalsService, authFactory, $http, $scope, $rootScope, $location){
	
  /* VARIABLE DEFINITIONS */

  //setup our data for the Add Goal view

  $scope.data = {
        goal: {
          content: "",
          endDate: "",
          why: [],
          freq: {
            daily: false,
            weekly: false,
            monthly: false
          }
        }
  };

  //data model for the users current goal inspiration. pushes to $scope.data.goal.why array

  $scope.data.currentWhy = "";

  //skip button show/hide

  $scope.showSkipButton = false;

  //this tracks whether a required field has been touched but not filled in
  $scope.conflict = false;

  //text for the reasons pane goes here. as of now the first values are only used on form
  //reset, as they're coded into the html view template for initial load

  $scope.phrases = ["Now tell us why! What makes this a goal worth acheiving for you?","Tell us more - can you be specific? Try to think of what's behind your first reason - what makes that important to you? (or you can skip below)","Let's get really deep - why do you want that to be the case? What would this do in your life? Would it bring you happiness, prosperity, or growth? (or you can skip below)"];
  $scope.buttonText = ["Let's Rock!","Let's go deeper", "OK, let's setup reminders!"];



  /* FUNCTION DEFINITIONS */

  //The require function checks on ng-blur to see if the blurred field has been filled in
  //If not, it will set the class "error" on the input field (passed in here as event.target)

  $scope.require = function(event){
    if (event.target.value == ""){
      $(event.target).parent().addClass("error");
    } else {
      $(event.target).parent().removeClass("error");      
    }
  };

  //Function that adds the current goal inspiration the user is adding to $scope.data.goal.why array

  $scope.addReasonAndPrompt = function(){

    $scope.data.goal.why.push($('.inspiration').val());
    $('.inspiration').val('');

    $scope.showSkipButton = true;
    
    if ($scope.data.goal.why.length < 3){
      $scope.showNextPrompt();
    } else {
      $scope.createGoal();
    }

  }

  //shows the next prompt for the reasons pane, pulling from the $scope variables for the
  //appropriate text for the buttons and placeholder text, and adds a transition for visual
  //appeal

  $scope.showNextPrompt = function(){

    var currentVal = $scope.data.goal.why.length;

    $('#sendButton').text($scope.buttonText[currentVal]);
    $('.inspiration').attr('placeholder', $scope.phrases[currentVal]);
    $('.inspiration').transition('pulse');
  }


  //resets all form elements. used on send success.

  $scope.clearForm = function(){
    $scope.data = {
            goal: {
              content: "",
              endDate: "",
              why: [],
              freq: {
                daily: false,
                weekly: false,
                monthly: false
              }
            }
      };
    $scope.showSkipButton = false;
    $scope.conflict = false;

    $('#sendButton').text($scope.buttonText[0]);
    $('.inspiration').attr('placeholder', $scope.phrases[0]);

  }

  //Scope function to attach to the goalsService creation function

  $scope.createGoal = function(){
    if (authFactory.loggedInUser) {
      if ($('.inspiration').val() !== ""){
        $scope.data.goal.why.push($('.inspiration'));
      }

      var input = $scope.prepareData($scope.data.goal);

      goalsService.createGoal(input).then(function(res){
        console.log("Server says" + res);
        $scope.showCreateSuccess();
        $scope.clearForm();
        $rootScope.$broadcast('updated', {});
      });
    } else {
      alert('you must be logged in to create a goal')
    }
  }

  $scope.prepareData = function (data) {
    var prepared = {};

    prepared.content= data.content;
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

  //Utility function that shows the splash "dimmer" screen upon successful
  //message post.

  $scope.showCreateSuccess = function(){
    console.log($('.add-success'));
    $('.add-success').dimmer('show');
    setTimeout(function(){
      $('.add-success').dimmer('hide');
    }, 2000);
  };

  //Controls the toggle for email send frequency as seen in the view
  //Manually sets to true the clicked frequency value, and sets all others to
  //false
          
  $scope.freqToggle = function(value){
    for (key in $scope.data.goal.freq){
      if (value === key){
        $scope.data.goal.freq[key] = true;
      } else {
        $scope.data.goal.freq[key] = false;
      }
    }
  };

  $scope.venmoUserData = null;
  $scope.code = null;
  $scope.url = null;

/********************* Payments ********************/

  $scope.getUserData = function (callback) {
    if ($location.absUrl() !== 'http://localhost:3000/#/profile') {
    var code = $location.absUrl().toString();
    $scope.code = {code: code.split('=')[1].split('#')[0]};
    return $http ({
      method: 'POST',
      url: '/payments',
      data: $scope.code
      }).then(function(res){
      console.log(res);
      $scope.venmoUserData = res;
      callback();
    });
    }
  };

  $scope.getFriends = function () {
    return $http ({
      method: 'GET',
      url: '/getFriends',
      }).then(function(res){
      console.log(res);
      $scope.venmoFriends = res.data;
    });
  }

  if (!$scope.venmoFriends){
   $scope.getUserData($scope.getFriends);
   console.log($scope.venmoFriends);
  }

  $scope.runScript = function () {

  }

  $scope.schedulePay = function (amount, id) {

    // var date = moment($scope.picker.get('select').obj).format('L').split('/').join(' ')
    var date = $scope.picker.get('select').obj

    var payDetails = {amount:amount, receiverID: id, date: date}
    
    return $http ({
      method: 'POST',
      url: '/schedulePay',
      data: payDetails
    }).then(function(res){
      console.log(res.data)
    });
  }

  $scope.$on('$viewContentLoaded', function(){
    
    var $input = $('.datepicker').pickadate();
    $scope.picker = $input.pickadate('picker');


  });


});

