var register = angular.module('RegisterController', []);

register.controller('registerController', function($scope, $http, $location) {
	console.log("In register controller!");

	$scope.registerError = false;
	$scope.user = {};

	$scope.registerUser = function() {
		console.log("Registering: ", $scope.user);

		// Make request
		$http.post('users/', $scope.user).
			success(function(data, status, headers, config) {
				console.log("Got data: ", data);
				if(!data)
					return;

				$scope.registerError = false;
				$scope.setLoginData(data);

				alert("Your account was registered successfully!");

				$location.path('/');
			}).
			error(function(data, status, headers, config) {
				console.log("Received creation error: ", data);
				$scope.registerError = "Couldn't register a new account at this time. Please try again later.";
			});
	};
});