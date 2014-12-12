var account = angular.module('AccountController', []);

account.controller('accountController', function($scope, Users, $upload, $http) {
	this.init = function() {
		$scope.editPassword = {
			old: "",
			new: "",
			verifyNew: "",
			dontMatch: false,
			wrongPassword: false
		};

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

	$scope.changePassword = function() {
		$http.post('users/checkPassword', {'username': $scope.user.username, 'password': $scope.editPassword.old})
		.success(function(data, status, headers, config) {
			$scope.editPassword.wrongPassword = false;

			if($scope.editPassword.new === $scope.editPassword.verifyNew) {
				$scope.user.password = $scope.editPassword.new;
				$scope.user.$update({userId: $scope.user._id});

				$scope.editPassword.dontMatch = false;
				$scope.editPassword.old = "";
				$scope.editPassword.new = "";
				$scope.editPassword.verifyNew = "";
				$('#changePassword').modal('hide');
			}
			else {
				$scope.editPassword.dontMatch = true;
			}
		})
		.error(function(data, status, headers, config) {
			if(status === 401) {
				$scope.editPassword.wrongPassword = true;

				if($scope.editPassword.new === $scope.editPassword.verifyNew) {
					$scope.editPassword.dontMatch = false;
				}
				else {
					$scope.editPassword.dontMatch = true;
				}
			}
		});
	};

	$scope.cancelChangePassword = function() {
		$scope.editPassword.old = "";
		$scope.editPassword.new = "";
		$scope.editPassword.verifyNew = "";
	};

});
