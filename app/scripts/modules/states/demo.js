angular.module('demo', ['ParseServices', 'ExternalDataServices'])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

	$stateProvider

	.state('demo', {
		abstract: true,
        views: {
            '@': {
                templateUrl: 'app/views/app-layout.html',
            },
            'panel@demo': {
                templateUrl: 'app/views/master-detail.html',
                controller: 'IdeasController',
                resolve: {
                    'ideas': ['IdeaService', function(IdeaService) {

                        // get the collection from our data definitions
                        var ideas = new IdeaService.collection;

                        // use the extended Parse SDK to load the whole collection
                        return ideas.load();

                    }]
                }

            }
        }
    })
    .state('demo.ideas', {
        url: '/',
        views: {
            'detail@demo': {
                templateUrl: 'app/views/detail/ideas.html'
            },
            'hero@demo.ideas':{
                templateUrl: 'app/views/detail/ideas.hero.html',
            }

        }
    })
    .state('demo.ideas.detail', {
    	url: 'ideas/{monsterId}',
    	views: {
    		
    		'detail@demo' : {
    			templateUrl: 'app/views/detail/ideas.detail.html',
                controller: 'DetailController'
    		}

    	}
    })

    .state('demo.ideas.detail.edit', {
        url: '/edit',
        views: {
            'detail@demo' : {
                templateUrl: 'app/views/detail/ideas.detail.edit.html',
                controller: 'DetailController'
            }

        }
    })


}])