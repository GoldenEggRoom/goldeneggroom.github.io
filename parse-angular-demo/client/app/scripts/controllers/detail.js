angular.module('demo')

.controller('DetailController', ['$rootScope', '$scope', '$state', '$stateParams', '$sce', '$location', 'IdeaService', function($rootScope, $scope, $state, $stateParams, $sce, $location, IdeaService) {
  
  $scope.detailCtrl = {
    current : null
  };

  // inherit the collection from the parent controller and find the current model
  // $scope.fetchMonstersPromise.then(function(col) {
    $scope.detailCtrl.current = $scope.ideasCtrl.collection.find(function(current) {
      return current.id == $stateParams.monsterId;
    })
  // })

  $scope.detailCtrl.editCurrent = {
    title: null,
    tout: null,
    target: null,
    summary: null,
    pitchVideoUrl: null
  }

  if ($scope.detailCtrl.current) {
    $scope.detailCtrl.editCurrent.title = $scope.detailCtrl.current.getTitle()
    $scope.detailCtrl.editCurrent.summary = $scope.detailCtrl.current.getSummary()
    $scope.detailCtrl.editCurrent.tout = $scope.detailCtrl.current.getTout()
    $scope.detailCtrl.editCurrent.target = $scope.detailCtrl.current.getTarget()
    $scope.detailCtrl.editCurrent.pitchVideoUrl = $scope.detailCtrl.current.getPitchVideoUrl()
  }

  $scope.detailCtrl.saveIdea = function() {

    // set the new attributes
    $scope.detailCtrl.current.setTitle($scope.detailCtrl.editCurrent.title);
    $scope.detailCtrl.current.setSummary($scope.detailCtrl.editCurrent.summary);
    $scope.detailCtrl.current.setTout($scope.detailCtrl.editCurrent.tout);
    $scope.detailCtrl.current.setTarget($scope.detailCtrl.editCurrent.target);
    $scope.detailCtrl.current.setPitchVideoUrl($scope.detailCtrl.editCurrent.pitchVideoUrl);

    // perform the save
    $scope.detailCtrl.current.saveParse().then(function(idea) {

      //remove the loader
      //$('#savingForm').remove();

      $location.path('/ideas/' + idea.id);

    }, function(err) {
      // catch any errors
      alert('Error saving to Parse, check the console and network tab')
      console.log(err)
    })

  }

  $scope.detailCtrl.createIdea = function() {

    // set the new attributes
    $scope.ideasCtrl.collection.addIdea($scope.detailCtrl.editCurrent.title, $scope.detailCtrl.editCurrent.tout, $scope.detailCtrl.editCurrent.target, function(data) {
      $location.path('/ideas/' + data.id + '/edit')
    })

  }

  $scope.detailCtrl.endorse = function() {

    $scope.detailCtrl.current.incrementEducatorVotes();

    $scope.detailCtrl.current.saveParse().then(function(idea) {

    }, function(err) {
      // catch any errors
      alert('Error saving to Parse, check the console and network tab')
      console.log(err)
    })
  }

  $scope.detailCtrl.volunteer = function() {

    $scope.detailCtrl.current.incrementDeveloperVotes();

    $scope.detailCtrl.current.saveParse().then(function(idea) {

    }, function(err) {
      // catch any errors
      alert('Error saving to Parse, check the console and network tab')
      console.log(err)
    })
  }

  $scope.transitionTo = function(state) {
    $state.transitionTo(state);
  }

  $scope.isActiveState = function(state) {

    if(state == $state.current.name) {
      return 'light-back';
    } else {
      return
    }
  }

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

}]);