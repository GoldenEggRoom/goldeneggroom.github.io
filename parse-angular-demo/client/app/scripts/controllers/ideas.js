angular.module('demo')

.controller('IdeasController', ['$rootScope', '$scope', '$state', '$stateParams', 'IdeaService', 'ideas', function($rootScope, $scope, $state, $stateParams, IdeaService, ideas) {
  $scope.ideasCtrl = {
    collection: ideas
  };




}]);