angular.module('forms', [])

.directive('editIdeaForm', ['ParseQueryAngular', '$location', function(ParseQueryAngular, $location) {

  var addLoaderTo = function(element, name, message) {
    element.append('<div id="'+name+'" class="important-white-back opacity-9 loading absolute top" style="width:100%; height:100%;"><div class="v-outer-container" style="height: 100%"><div class="v-inner-container"><div class="v-aligned-content big-top-margin"><span class="muted">' + message + '</span></div></div></div></div>');
  }

  return {
    restrict: 'A',
    scope: {
      ideaToSave: "="
    },
    link: function(scope, element, attrs) {

      // need to put a watch here because directive is loaded but Parse promise is not finished loading the monsters yet

      scope.editedIdea = {
        title: null,
        summary: null,
        pitchVideoUrl: null
      }

      scope.$watch('ideaToSave.attributes.title', function(title) {
        scope.editedIdea.title = title;
      })

      scope.$watch('ideaToSave.attributes.summary', function(summary) {
        scope.editedIdea.summary = summary;
      })

      scope.$watch('ideaToSave.attributes.pitchVideoUrl', function(pitchVideoUrl) {
        scope.editedIdea.pitchVideoUrl = pitchVideoUrl;
      })

      scope.saveIdea = function() {

        // put the form in a loading state
        var loadingContainer = $('#loadingContainer');
        addLoaderTo(loadingContainer, 'savingForm', 'Saving');
        element.find('button').attr('disabled','disabled');

        // set the new attributes
        scope.ideaToSave.setTitle(scope.editedIdea.title);
        scope.ideaToSave.setSummary(scope.editedIdea.summary);
        scope.ideaToSave.setPitchVideoUrl(scope.editedIdea.pitchVideoUrl);

        // perform the save
        scope.ideaToSave.saveParse().then(function(idea) {

          //remove the loader
          $('#savingForm').remove();

          $location.path('/ideas/' + idea.id);

        }, function(err) {
          // catch any errors
          alert('Error saving to Parse, check the console and network tab')
          console.log(err)
        })

      }

      // need to do stuff to the element when it is clicked
    }
  }
}])

