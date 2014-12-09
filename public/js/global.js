var indexController = angular.module('GlobalController', []);

indexController.controller('globalController', function($scope, $http, $window, $location) {

	$scope.isLoggedIn = $window.localStorage.getItem('token') != null;

	$scope.checkLogin = function() {
		$http.get('/users/test')
			.success(function(data, status, headers, config) {
				console.log("User expires at " + data.expires);
			})
			.error(function(data, status, headers, config) {
				if(status == 401)
					$scope.doLogout(true);
			});
	};

	$scope.checkLogin();

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
			{
				$scope.loginError = "Error while logging in. Please try back later."
				return;
			}

			// Retrieve token and user from results
			var token = data.token;
			var user = JSON.stringify(data.user);

			// Save token and user to storage
			$window.localStorage.setItem('token', token);
			$window.localStorage.setItem('user', user);

			// Clear login fields
			$scope.login_username = '';
			$scope.login_password = '';
			$scope.loginError = false;

			// Complete login process on UI
			$scope.isLoggedIn = true;
			$('#loginModal').modal('hide');
		}).
		error(function(data, status, headers, config) {
			// Display appropriate error message in modal
			if(status == 401)
				$scope.loginError = "Bad username or password";
			else
				$scope.loginError = "Error while logging in. Please try back later.";
		});
	};

	$scope.doLogout = function(skipAlert) {

		// Set user as not logged in
		$scope.isLoggedIn = false;

		// Clear token and user
		$window.localStorage.removeItem('token');
		$window.localStorage.removeItem('user');

		if(!skipAlert)
			alert("You were logged out successfully");

		$location.path('/');
	};

	// Called by main search bar, redirects to search page
	$scope.doSearch = function() {
		$location.path('/search').search('search', $scope.searchBar);
	};
});
