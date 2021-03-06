// reference the module we declared earlier
angular.module('ExternalDataServices')

// add a factory
.factory('GoldenEggUserService', ['ParseQueryAngular', function(ParseQueryAngular) {

	var GoldenEggUser = Parse.Object.extendAngular({
		className:"GoldenEggUser",
		setUserId: function(id) {
			this.set('userId',id);
			return this;
		},
		setFacebookId: function(id){
			this.set('facebookId',id);
			return this;
		},
		setRole: function(role) {
			this.set('role', role);
			return this;
		},
		setPicture: function(pic) {
		    this.set('picture', pic);
		    return this;
		},
		setFirstName: function(firstName){
		    this.set('firstName', firstName);
		    return this;
		},
		setLastName: function (lastName) {
		    this.set('lastName', lastName);
		    return this;
		},
		getUserId: function() {
			return this.get('userId');
		},
		getFacebookId: function(){
			return this.get('facebookId');
		},
		getRole: function(role) {
			return this.get('role');
		},
		getPicture: function(pic) {
		    return this.get('picture');
		},
		getFirstName: function(){
		    return this.get('firstName');
		},
		getLastName: function() {
		    return this.get('lastName');
		},
		destroyParse:function(){
			return ParseQueryAngular(this,{functionToCall:"destroy"});
		}
	});

	var GoldenEggUsers = Parse.Collection.extendAngular({
		model: GoldenEggUser,
		comparator: function(model) {
			return -model.createdAt.getTime();
		},
		loadGoldenEggUserWithId: function(id) {
			this.query = (new Parse.Query(GoldenEggUser));
			this.query.equalTo('userId', id);
			// use the enhanced load() function to fetch the collection
			return this.load();
		},
		addGoldenEggUser: function(userId, facebookId, email, role, firstName, lastName, picture) {
	 		// save request_id to Parse
	 		var _this = this;

			var user = new GoldenEggUser;
			user.setUserId(userId);
			user.setFacebookId(facebookId);
			user.setRole(role);
			//user.setEmail(email);
			user.setFirstName(firstName);
			user.setLastName(lastName);
			user.setPicture(picture);

			// use the extended Parse SDK to perform a save and return the promised object back into the Angular world
			return user.saveParse().then(function(data){
				_this.add(data);
			})
	 	},
	 	removeGoldenEggUser:function(user) {
	 		if (!this.get(user)) return false;
	 		var _this = this;
	 		return user.destroyParse().then(function(){
	 			_this.remove(user);
	 		});
	 	}
	});

	// Return a simple API : model or collection.
	return {
		model: GoldenEggUser,
		collection: GoldenEggUsers
	};

}]);