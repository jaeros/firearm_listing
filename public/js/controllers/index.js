var index = angular.module('IndexController', []);

index.controller('indexController', function($scope, $location, Listings, Manufacturers, searchService) {

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

	$scope.searchByGunType = function(inputGunType) {
		searchService.setSearch({gunType: inputGunType});
		$location.path('/search');
	};


	// Initial search parameters
	$scope.searchParams = {
		search: null, // Text search
		manufacturer: null,
	};

	$scope.doSearch = function() {
		console.log("Searching with ", $scope.searchParams);

		$http({
			url: '/listings',
			method: "GET",
			params: $scope.searchParams
		})
		.success(function(data, status, headers, config) {
			console.log("Got results: ", data);
			$scope.listings = data;
			
		})
		.error(function(data, status, headers, config) {
			console.log("Got error: ", data);
		});
	};

	//var myData = [{id: manufacturerId, label: {{manufacturers_value}} }];
	//$(".myDropdownCheckbox").dropdownCheckbox({
	//  data: myData,
	//  title: "Manufacturers"
	//});
});
