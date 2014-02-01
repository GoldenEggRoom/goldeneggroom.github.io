// reference the module we declared earlier
angular.module('ExternalDataServices')

// add a factory
.factory('IdeaService', ['ParseQueryAngular', function(ParseQueryAngular) {

    var Idea = Parse.Object.extendAngular({
		className:"Idea",
		setOwner: function(owner) {
        	this.set('owner', owner);
        	return this;
		},
		setTitle: function(title) {
			this.set('title', title);
			return this;
		},
		setSummary: function(summary) {
			this.set('summary', summary);
			return this;
		},
		setPitchVideoUrl: function(pitchVideoUrl) {
			this.set('pitchVideoUrl', pitchVideoUrl);
			return this;
		},
		getOwner: function(owner) {
			return this.get('owner');
		},
		getTitle: function(title) {
			return this.get('title');
		}
		getSummary: function(summary) {
			return this.get('summary');
		}
		getPitchVideoUrl: function(pitchVideoUrl) {
			return this.get('pitchVideoUrl');
		}
		destroyParse:function(){
			return ParseQueryAngular(this,{functionToCall:"destroy"});
		}
	});

	var Ideas = Parse.Collection.extendAngular({
		model: Idea,
		comparator: function(model) {
			return -model.createdAt.getTime();
		},
		addIdea: function(owner, title, summary, pitchVideoUrl) {
	 		// save request_id to Parse
	 		var _this = this;

			var idea = new Idea;
			idea.setOwner(owner);
			idea.setTitle(title);
			idea.setSummary(summary);
			idea.setPitchVideoUrl(pitchVideoUrl);

			// use the extended Parse SDK to perform a save and return the promised object back into the Angular world
			return idea.saveParse().then(function(data){
				_this.add(data);
			})
	 	},
	 	removeIdea:function(idea) {
	 		if (!this.get(idea)) return false;
	 		var _this = this;
	 		return idea.destroyParse().then(function(){
	 			_this.remove(idea);
	 		});
	 	}
	});

    // Return a simple API : model or collection.
	return {
		model: Idea,
		collection: Ideas
	};

}]);