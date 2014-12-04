var indexController = angular.module('GlobalController', []);

indexController.controller('globalController', function($scope, $http, $window) {
	$scope.globalTest = "Global Controller Text";

	$scope.isLoggedIn = false;

	/* Login dialog */
	$scope.doLogin = function() {
		console.log("Logging in with user " + $scope.login_username + ", password " + $scope.login_password);

		$http.post('users/login', 
		{
			'username': $scope.login_username, 
			'password': $scope.login_password
		}).
		success(function(data, status, headers, config) {
			if(!data)
				console.error('No data received!');
			// Retrieve token and user from results
			var token = data.token;
			var user = data.user;

			// Save token to storage
			console.log("Got token: ", token);
			$window.localStorage.setItem('token', token);

			// Save the user
			$window.localStorage.setItem('user', user);

			$scope.isLoggedIn = true;
		}).
		error(function(data, status, headers, config) {
			console.error('Error while logging in: ', data);
		});
	};
});