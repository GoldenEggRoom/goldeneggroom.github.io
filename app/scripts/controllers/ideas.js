angular.module('demo')

.controller('IdeasController', ['$rootScope', '$scope', '$state', '$stateParams', '$sce', 'IdeaService', 'ideas', function($rootScope, $scope, $state, $stateParams, $sce, IdeaService, ideas) {
  
 
  $scope.ideasCtrl = {
    collection: ideas,
  };
  //$scope.featuredIdea = ideas.models[currentFeature];

  $scope.currentIndex = 0;

  $scope.setCurrentSlideIndex = function (index) {
      $scope.currentIndex = index;
  };

  $scope.isCurrentSlideIndex = function (index) {
      return $scope.currentIndex === index;
  };
  $scope.nextFeature = function()
  {
    if($scope.currentIndex < ideas.length - 1)
    {
  	   $scope.currentIndex++;
    }
    else {
        $scope.currentIndex = 0;
    }
    //$scope.featuredIdea = ideas.models[currentFeature];
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