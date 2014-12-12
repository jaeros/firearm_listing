var search = angular.module('SearchController', []);

search.controller('searchController', function($scope, Listings, Manufacturers, $routeParams, searchService) {

	// Initial search parameters
	$scope.searchParams = {
		search: null, // Text search
		manufacturer: null,
		minPrice: null,
		maxPrice: null,
		caliber: null,
	};

	$scope.globalTest = "Search Controller Text";

	//Get related listings
	Listings.query(function(listings) {
		$scope.listings = listings;
		console.log(listings);
	});

	$scope.init = function() {

		$scope.searchParams = searchService.getSearch();
		console.log("Search params: ", $scope.searchParams);

		// // Load list of all manufacturers
		// Manufacturers.query(function(manufacturers) {
		// 	$scope.manufacturers = manufacturers;
		// 	console.log("Manufacturers: ", manufacturers);
		// })

		// // Load list of 
	};

	$scope.init();
});