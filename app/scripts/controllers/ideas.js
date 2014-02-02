angular.module('demo')

.controller('IdeasController', ['$rootScope', '$scope', '$state', '$stateParams', '$sce', 'IdeaService', 'ideas', function($rootScope, $scope, $state, $stateParams, $sce, IdeaService, ideas) {
  
  var currentFeature = 0;
  $scope.ideasCtrl = {
    collection: ideas,
  };
  $scope.featuredIdea = ideas.models[currentFeature];

  
  $scope.nextFeature = function()
  {
    if(currentFeature < ideas.length - 1)
    {
  	 currentFeature++;
    }
    else {
      currentFeature = 0;
    }
    $scope.featuredIdea = ideas.models[currentFeature];
  };


  $scope.trustSrc = function(src) {
    if(src && src.length)
    {
      return $sce.trustAsResourceUrl(src);
    }
    else
    {
      return $sce.trustAsResourceUrl("about:blank");
    }
  }



}]);