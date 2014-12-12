var index = angular.module('IndexController', []);

index.controller('indexController', function($scope, Listings, Manufacturers, searchService) {
	$scope.globalTest = "Index Controller Text";

	//Get related listings
	Listings.query(function(listings) {
		$scope.listings = listings;
	});
	Manufacturers.query(function(manufacturers) {
		$scope.manufacturers = manufacturers;
	});

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

	//var myData = [{id: manufacturerId, label: {{manufacturers_value}} }];
	//$(".myDropdownCheckbox").dropdownCheckbox({
	//  data: myData,
	//  title: "Manufacturers"
	//});
});
