angular.module('demo')

.controller('IdeasController', ['$rootScope', '$scope', '$state', '$stateParams', '$sce', 'IdeaService', 'ideas', function($rootScope, $scope, $state, $stateParams, $sce, IdeaService, ideas) {
  $scope.ideasCtrl = {
    collection: ideas,
    featuredIdea: ideas[0]
  };



  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }



}]);