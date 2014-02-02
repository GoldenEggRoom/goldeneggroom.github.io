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
		setDevCommitment: function(devCommitment) {
			this.set('devCommitment', devCommitment);
			return this;
		},
		setDesignCommitment: function(designCommitment) {
			this.set('designCommitment', designCommitment);
			return this;
		},
		setEducatorCommitment: function(educatorCommitment) {
			this.set('educatorCommitment', educatorCommitment);
			return this;
		},
		setMonetaryCommitment: function(monetaryCommitment) {
			this.set('monetaryCommitment', monetaryCommitment);
			return this;
		},
		setEducatorVotes: function(educatorVotes) {
			this.set('educatorVotes', educatorVotes);
			return this;
		},
		setDeveloperVotes: function(developerVotes) {
			this.set('developerVotes', developerVotes);
			return this;
		},
		incrementEducatorVotes: function() {
			this.increment('educatorVotes');
			return this;
		},
		incrementDeveloperVotes: function() {
			this.increment('developerVotes');
			return this;
		},
		getOwner: function(owner) {
			return this.get('owner');
		},
		getTitle: function(title) {
			return this.get('title');
		},
		getSummary: function(summary) {
			return this.get('summary');
		},
		getPitchVideoUrl: function(pitchVideoUrl) {
			return this.get('pitchVideoUrl');
		},
		getDevCommitment: function(devCommitment) {
			return this.get('devCommitment');
		},
		getDesignCommitment: function(designCommitment) {
			return this.get('designCommitment');
		},
		getEducatorCommitment: function(educatorCommitment) {
			return this.get('educatorCommitment');
		},
		getMonetaryCommitment: function(monetaryCommitment) {
			return this.get('monetaryCommitment');
		},
		getTraction: function() {
			return this.get('devCommitment') + this.get('designCommitment') + 
				this.get('educatorCommitment') + this.getVotes();
		},
		getEducatorVotes: function(educatorVotes) {
			return this.get('educatorVotes');
		},
		getDeveloperVotes: function(developerVotes) {
			return this.get('developerVotes');
		},
		getVotes: function() {
			return this.get('developerVotes') + this.get('educatorVotes');
		},
		destroyParse:function(){
			return ParseQueryAngular(this,{functionToCall:"destroy"});
		}
	});

	var Ideas = Parse.Collection.extendAngular({
		model: Idea,
		comparator: function(model) {
			return -model.createdAt.getTime();
		},
		addIdea: function(title, summary, complete) {
	 		// save request_id to Parse
	 		var _this = this;

			var idea = new Idea;
			idea.setTitle(title);
			idea.setSummary(summary);
			idea.setDevCommitment(0);
			idea.setDesignCommitment(0);
			idea.setEducatorCommitment(0);
			idea.setMonetaryCommitment(0);
			idea.setEducatorVotes(0);
			idea.setDeveloperVotes(0);

			// use the extended Parse SDK to perform a save and return the promised object back into the Angular world
			return idea.saveParse().then(function(data){
				_this.add(data);
				if (typeof(complete) === "function") {
					complete(data);
				}
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