angular.module('facebook')

.controller('FacebookExampleController', ['$rootScope', '$scope', '$state', '$stateParams', 'FacebookAngularPatch', 'ParseQueryAngular', 'GoldenEggUserService', 'goldenEggUsers', function ($rootScope, $scope, $state, $stateParams, FacebookAngularPatch, ParseQueryAngular, GoldenEggUserService, goldenEggUsers) {
  	


  $scope.facebookCtrl = {
    fbAuthData : {},
    response : {}
  };

  $scope.asEducator = function () {
      Parse.User.current().fetch().then(function (user) {
          user.save({
              role: 'educator'
          });
          window.location = "#/";
      });
  };

  $scope.asDeveloper = function () {
      Parse.User.current().fetch().then(function (user) {
          user.save({
              role: 'developer'
          });
          window.location = "#/";
      });
  }

  if (Parse.User.current() && $('.lnk-login').is(':visible')) {
      Parse.User.current().fetch().then(function (user) {
          $rootScope.user = {};
          $rootScope.user.facebookId = user.get('facebookId');
          $rootScope.user.firstName = user.get('firstName');
          $rootScope.user.lastName = user.get('lastName');
          $rootScope.user.picture = user.get('pictureUrl');
          $rootScope.user.role = user.get('role');
          $('.user-name').html('Welcome! ' + $rootScope.user.firstName + ' ' + $rootScope.user.lastName + '');
          $('.user-pic').css('background-image', 'url("' + $rootScope.user.picture + '")');
          $('.lnk-login').hide();
          $('.user-info').show();
      });
  }
      

      $scope.fbConnect = function () {

          // NB: this is a contrived example for demo purposes, you would never write the following code in a real app

          // normally you would define a User.js data module for all your user objects and the method below would be on the user, e.g. $rootScope.currentUser.fbConnect() 
          ParseQueryAngular(Parse.FacebookUtils, {
              functionToCall: "logIn", params: [null,
                  {

                      success: function (user) {
                          var userId = user.id;
                          FB.api("/me", function (response) {
                             
                              if (response && !response.error) {
                                  var facebookId = response.id;
                                  var firstName = response.first_name;
                                  var lastName = response.last_name;
                                  FB.api(
                                      "/me/picture",
                                      function (response) {
                                          Parse.User.current().fetch().then(function (user) {
                                              var picture = response.data.url;

                                              user.save({
                                                  pictureUrl: picture,
                                                  firstName: firstName,
                                                  lastName: lastName,
                                                  facebookId: facebookId
                                              });
                                              window.location = "#/facebook/role";
                                          });
                                      }
                                    );

                              }
                          });

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



  
}]);