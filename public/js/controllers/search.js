var search = angular.module('SearchController', []);

search.controller('searchController', function($scope, Listings, Manufacturers, $routeParams, searchService, $http) {

	// Initial search parameters
	$scope.searchParams = {
		search: null, // Text search
		manufacturer: null,
		minPrice: null,
		maxPrice: null,
		caliber: null,
	};

	$scope.init = function() {

		// Retrieve any search parameters from service
		$scope.searchParams = searchService.getSearch();
		console.log("Search params: ", $scope.searchParams);

		// Perform initial search
		$scope.updateSearch();
	};

	$scope.updateSearch = function() {
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

	$scope.init();
});