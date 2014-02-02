angular.module('facebook')

.controller('FacebookExampleController', ['$rootScope', '$scope', '$state', '$stateParams', 'FacebookAngularPatch', 'ParseQueryAngular', 'GoldenEggUserService', 'goldenEggUsers', function ($rootScope, $scope, $state, $stateParams, FacebookAngularPatch, ParseQueryAngular, GoldenEggUserService, goldenEggUsers) {
  	


  $scope.facebookCtrl = {
    fbAuthData : {},
    response : {}
  };

  $scope.asEducator = function () {
      goldenEggUsers.loadGoldenEggUserWithId(Parse.User.current().id).then(function (goldenEggUser) {
<<<<<<< HEAD
          goldenEggUsers.remove(goldenEggUser.models[0].id);
          goldenEggUser.models[0].attributes['role'] = 'educator';
          goldenEggUsers.addGoldenEggUser(goldenEggUser.models[0].attributes['userId'], goldenEggUser.models[0].attributes['faecbookId'], null, 'educator', goldenEggUser.models[0].attributes['firstName'], goldenEggUser.models[0].attributes['lastName']);
      });
  }
=======
          var user = goldenEggUser.models[0];

          goldenEggUsers.addGoldenEggUser(user.getUserId(), user.getFacebookId(), null, 'educator', user.getFirstName(), user.getLastName(), user.getPicture());
          goldenEggUsers.removeGoldenEggUser(user);
          window.location = "#/";
      });
  };

  $scope.asDeveloper = function () {
      goldenEggUsers.loadGoldenEggUserWithId(Parse.User.current().id).then(function (goldenEggUser) {
          var user = goldenEggUser.models[0];

          goldenEggUsers.addGoldenEggUser(user.getUserId(), user.getFacebookId(), null, 'developer', user.getFirstName(), user.getLastName(), user.getPicture());
          goldenEggUsers.removeGoldenEggUser(user);
          window.location = "#/";
      });
  }

>>>>>>> 9b7298027b5fa3c340d7d9d690a2a4d139efed40
  if (Parse.User.current()) {
      $scope.facebookCtrl.fbAuthData = Parse.User.current().get('authData');
      
      goldenEggUsers.loadGoldenEggUserWithId(Parse.User.current().id).then(function (goldenEggUser) {
          var userInfo = goldenEggUser.models[0];
          Parse.User.current().userId = userInfo.getUserId();
          Parse.User.current().firstName = userInfo.getFirstName();
          Parse.User.current().lastName = userInfo.getLastName();
          Parse.User.current().picture = userInfo.getPicture();

          $('.user-name').html('Welcome ' + userInfo.getRole() + ' ' + userInfo.getFirstName() + ' ' + userInfo.getLastName() + '!');

          $('.user-pic').css('background-image', 'url("' + userInfo.getPicture() + '")');

          $('.lnk-login').hide();

          $('.user-info').show();
          var userInfo = goldenEggUser.models[0].attributes;
          if (!userInfo['role']) {
              window.location = "#/facebook/role";
              return;
          } else {
              window.location = "#/";

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
                          debugger;
                          var userId = user.id;
                          FB.api("/me", function (response) {
                             
                              if (response && !response.error) {
                                  var facebookId = response.id;
                                  var firstName = response.first_name;
                                  var lastName = response.last_name;
                                  FB.api(
                                      "/me/picture",
                                      function (response) {
                                          debugger;

                                          var picture = response.data.url;
                                          if (response && !response.error) {
                                              goldenEggUsers.addGoldenEggUser(userId, facebookId, null, null, firstName, lastName, picture);
                                              window.location = "#/facebook/role";
                                          }
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



  }
}]);