angular.module('facebook')

.controller('FacebookExampleController', ['$rootScope', '$scope', '$state', '$stateParams', 'FacebookAngularPatch', 'ParseQueryAngular', function($rootScope, $scope, $state, $stateParams, FacebookAngularPatch, ParseQueryAngular) {
  	


  $scope.facebookCtrl = {
    fbAuthData : {},
    response : {}
  };

  if(Parse.User.current()) {
    $scope.facebookCtrl.fbAuthData = Parse.User.current().get('authData');
  }


  $scope.fbConnect = function() {

  	// NB: this is a contrived example for demo purposes, you would never write the following code in a real app

 	// normally you would define a User.js data module for all your user objects and the method below would be on the user, e.g. $rootScope.currentUser.fbConnect() 
  	ParseQueryAngular(Parse.FacebookUtils,{functionToCall:"logIn", params:[null, 
		{
			success: function(users) {
				FB.api(
					"/me",
					function (response) {
					  if (response && !response.error) {
						/* handle the result */
					  }
					}
				);
			},error: function(err){
				console.log(err);
			}
		}
	]}).then(function(user) {

  		$scope.facebookCtrl.fbAuthData = user.get('authData');

  	}, function(error) {

  		alert('something went wrong, try again');

  		$scope.facebookCtrl.fbAuthData = error;
  		
  	});

  }




}]);