/*******************************************
*  Controller for the goalsList template   *
*******************************************/

angular.module('app.goals', [])
.controller('goalsListController', function($scope, goalsService, authFactory){

	//temporary testing array for populating goals list
	$scope.data = {};
	var goalsList = []

	//stub function for testing / dev. will use HTTP service when fleshed out.

	$scope.getGoals = function(){
    if (authFactory.loggedInUser){
  		$scope.data.goalsList = goalsList;
  		goalsService.getGoals().then(function(data){
  			$scope.data.goalsList = data[0]['goals'];
  			console.log(JSON.stringify(data[0]['goals']));
  		});
    }
	}

	//Shows success dimmer flash and then deletes goal when the user clicks "I did it"

	$scope.celebrateSuccess = function(event){
		
		$('.success-dimmer').dimmer('show');
		
		$scope.successDelete(event);
	}

	$scope.successDelete = function(event){
		var idToDelete = $(event.target).closest('.item').find('.goal-id').val();
		goalsService.deleteGoal(idToDelete);
		$scope.getGoals();
		setTimeout(function(){
			$('.success-dimmer').dimmer('hide');
			
			//then refresh the view

			$scope.getGoals();

		}, 2000);
	}

	//Middle-man function for confirming deletion of a goal.
	//Shows the confirmation dimmer flash and stores the item so we can access it if the
	//user confirms

	$scope.deleteWithConfirm = function(event){
		$('.delete-goal-dimmer').dimmer('show');

		$scope.deletionPending = $(event.target);
	}

	//Activated when the user confirms deletion. Deletes the goal we're storing
	//and closes the dimmer flash window. Goal is found by going to the parent item of the clicked
	//element, then finding it's hidden 'goal-id' input element and getting its value.

	$scope.confirmedDelete = function(){
		var idToDelete = $scope.deletionPending.closest('.item').find('.goal-id').val();
		var goalsPromise = goalsService.deleteGoal(idToDelete);
		$scope.closeConfirmDimmer();
		//then refresh the view

		//$scope.getGoals();

		goalsPromise.then(function(){
			$('.success-dimmer').dimmer('hide');
			$scope.getGoals();
		});
	}
	
	//Function to close dimmer flash. Used above and directly from the "no" button on
	//deletion confirm.

	$scope.closeConfirmDimmer = function(){
		$('.delete-goal-dimmer').dimmer('hide');
	}

	//call our function to get goals on load
	$scope.getGoals();

	$scope.$on('updated', function(){
		$scope.getGoals();
	})

});