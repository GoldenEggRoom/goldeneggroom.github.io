angular.module('demo')

.controller('IdeasController', ['$rootScope', '$scope', '$state', '$stateParams', '$sce', 'IdeaService', 'ideas', function($rootScope, $scope, $state, $stateParams, $sce, IdeaService, ideas) {
  
  var currentFeature = 0;
  $scope.ideasCtrl = {
    collection: ideas,
  };
  $scope.featuredIdea = ideas[currentFeature];

  $scope.nextFeature = function()
  {
    if(currentFeature < ideas.length - 1)
    {
  	 currentFeature++;
    }
    else {
      currentFeature = 0;
    }
    $scope.featuredIdea = ideas[currentFeature];
  };


  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }



}]);