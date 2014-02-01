angular.module('app')


.controller('MenuController', ['$scope', '$state', function($scope, $state) {

	$scope.menuCtrl = {
    	menu: [{
    		name: "Educator",
    		state: "edu",
            activeFor: ["demo","features","facebook","about"],
            icon: "icon-user",
    		href: "#/edu/" 
    	},
    	{
    		name: "Developer",
    		state: "dev",
            activeFor: ["code"],
            icon: "icon-github",
    		href: "#/dev/" 
    	}]
    }

    $scope.isActive = function(menuItem) {

        var parentstate = $state.current.name.split('.');
        parentstate = parentstate[0];
        
    	if(_.indexOf(menuItem.activeFor, parentstate) >= 0) {
    		return "active";
    	}
    }

}])