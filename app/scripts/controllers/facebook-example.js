angular.module('facebook')

.controller('FacebookExampleController', ['$rootScope', '$scope', '$state', '$stateParams', 'FacebookAngularPatch', 'ParseQueryAngular', 'GoldenEggUserService', 'goldenEggUsers', function ($rootScope, $scope, $state, $stateParams, FacebookAngularPatch, ParseQueryAngular, GoldenEggUserService, goldenEggUsers) {
  	


  $scope.facebookCtrl = {
    fbAuthData : {},
    response : {}
  };

  if (Parse.User.current()) {
      $scope.facebookCtrl.fbAuthData = Parse.User.current().get('authData');
      
      goldenEggUsers.loadGoldenEggUserWithId(Parse.User.current().id).then(function (goldenEggUser) {
          var userInfo = goldenEggUser.models[0].attributes;
          $('.user-info').html(userInfo['firstName'] + ' ' + userInfo['lastName']);
          $('.lnk-login').hide();

          $('.user-info').show();
          var userInfo = goldenEggUser.models[0].attributes;
          if (!userInfo['role']) {
              window.location = "#/facebook/role";
              return;
          }
      });
  } else {

      $scope.fbConnect = function () {

          // NB: this is a contrived example for demo purposes, you would never write the following code in a real app

          // normally you would define a User.js data module for all your user objects and the method below would be on the user, e.g. $rootScope.currentUser.fbConnect() 
          ParseQueryAngular(Parse.FacebookUtils, {
              functionToCall: "logIn", params: [null,
                  {

                      success: function (user) {
                          var userId = user.id;
                          FB.api("/me", function (response) {
                              $scope.facebookCtrl.response = response;
                              if (response && !response.error) {
                                  goldenEggUsers.addGoldenEggUser(userId, response.id, null, null, response.first_name, response.last_name);
                                  window.location = "#/facebook/role";

                              }
                          }
                          );
                      }, error: function (err) {
                          console.log(err);
                      }
                  }
              ]
          }).then(function (user) {
              $scope.facebookCtrl.fbAuthData = user.get('authData');

          }, function (error) {

              alert('something went wrong, try again');

              $scope.facebookCtrl.fbAuthData = error;

          });

      }



  }
}]);