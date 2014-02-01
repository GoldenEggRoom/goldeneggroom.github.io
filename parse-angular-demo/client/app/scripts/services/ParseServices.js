angular.module('ParseServices', [])

.factory('ExtendParseSDK', ['ParseAbstractService', function(ParseAbstractService) {

  Parse.Object.extendAngular = function(options) {
    return ParseAbstractService.EnhanceObject(Parse.Object.extend(options));
  };

  Parse.Collection.extendAngular = function(options) {
    return ParseAbstractService.EnhanceCollection(Parse.Collection.extend(options));
  };

}])

.factory('ParseSDK', function() {

  // pro-tip: swap these keys out for PROD keys automatically on deploy using grunt-replace
  Parse.initialize("iYEJSYbbfnJSRsvFlGP7HlS35EdLQtRNGMNC61nP", "luCSjnyHaR3IdDoprk1AdnrWVwYgVB6N0Cw4xqum");

  // FACEBOOK init
  window.fbPromise.then(function() {

    Parse.FacebookUtils.init({

      // pro-tip: swap App ID out for PROD App ID automatically on deploy using grunt-replace
      appId: 481650395275919, // Facebook App ID
      channelUrl: 'http://brandid.github.io/parse-angular-demo/channel.html', // Channel File
      cookie: true, // enable cookies to allow Parse to access the session
      xfbml: true, // parse XFBML
      frictionlessRequests: true // recommended

    });

  });

});