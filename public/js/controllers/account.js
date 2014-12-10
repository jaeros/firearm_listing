var account = angular.module('AccountController', []);

account.controller('accountController', function($scope, Users) {
	this.init = function() {
		$scope.user = JSON.parse(localStorage.getItem('user'));

		$scope.editUser = Users.get({userId: $scope.user._id});
	};

	this.init();

	$scope.buildAddressString = function() {
		var addressString = "";

		if($scope.user.location) {
			if($scope.user.location.address1)
				addressString += $scope.user.location.address1 + ", ";
			if($scope.user.location.address2)
				addressString += $scope.user.location.address2 + ", ";
			if($scope.user.location.city)
				addressString += $scope.user.location.city + ", ";
			if($scope.user.location.state)
				addressString += $scope.user.location.state + " ";
			if($scope.user.location.zip)
				addressString += $scope.user.location.zip;
		}
		else {
			addressString += "No address entered";
		}

		return addressString;
	};

});
