angular.module('app', ['ui.router.compat' /* this is for ui-router */, 'ngAnimate',  /* states */ 'features', 'facebook', 'demo' , 'about', 'ParseServices' /* this is the Parse SDK */, 'ExternalDataServices' /* this is where we define all our models and collections */, 'forms' /* an example directive */, 'FacebookPatch' /* our facebook angular wrapper so we can use FB.apiAngular instead of FB.api */])

// hack to disable auto scrolling on hashchange because we're using ui-router to manage states, instead of the core angular router which cannot handle states
// discussion on this here: https://github.com/angular-ui/ui-router/issues/110
.value('$anchorScroll', angular.noop)

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$anchorScrollProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $anchorScrollProvider) {


	// this is required for the root url to direct to /#/
	$urlRouterProvider
        .otherwise('/');
    
    $stateProvider
	
	.state('code', {
		url: '/code',
		controller:   'aboutController',
		templateUrl:  'app/views/about.html'
	});

}])

.run(['ParseSDK', 'ExtendParseSDK', '$rootScope', '$state', '$stateParams','$location', function(ParseService, ExtendParseSDK, $rootScope, $state, $stateParams, $location) {
    $rootScope.user = {};
    if (Parse.User.current()) {
        Parse.User.current().fetch().then(function (user) {
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
    
	// Parse is initialised by injecting the ParseService into the Angular app
	$rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.isViewLoading = true;


    // loading animation
    $rootScope.setLoading = function() {
	    $rootScope.isViewLoading = true;
	};
	$rootScope.unsetLoading = function() {
	    $rootScope.isViewLoading = false;
	};


	$rootScope.$on('$stateChangeStart', function(ev, to, toParams, from, fromParams) {
		$rootScope.setLoading();
		console.log('state change start')

		// $rootScope.contentLoaded = false;
	})

	$rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
		$rootScope.unsetLoading();
		console.log('state change complete')
		console.log($rootScope.isViewLoading);
	});

}]);