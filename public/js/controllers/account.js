var account = angular.module('AccountController', []);

account.controller('accountController', function($scope, Users, $upload) {

	this.init = function() {
		$scope.changePassword = {};

		if(localStorage.getItem('user'))
			$scope.user = JSON.parse(localStorage.getItem('user'));
		else
			window.location = "/#";
		$scope.files = [];

		Users.get({userId: $scope.user._id}, function(user) {
			$scope.editUser = $scope.user = user;
		});
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

	/*jshint loopfunc: true */
	$scope.$watch('files', function() {
		for(var i = 0; i < $scope.files.length; i++) {
			var file = $scope.files[i];

			$scope.upload = $upload.upload({
				url: '/upload',
				method: 'POST',
				headers: {'Authorization': 'Bearer' + localStorage.getItem('token')},
				withCredentials: true,
				data: {userId: $scope.user._id},
				file: file
			}).success(function(data, status, headers, config) {
				var url = data.pathname;

				$scope.editUser.profileImageUrl = url;
				$scope.editUser.$update({userId: $scope.editUser._id}, function() {
					$scope.user = $scope.editUser;
				});
			});
		}
	});

});
