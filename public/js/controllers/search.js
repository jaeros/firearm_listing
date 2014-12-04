var search = angular.module('SearchController', []);

search.controller('searchController', function($scope, Listings) {
	$scope.globalTest = "Search Controller Text";

	//Get related listings
	Listings.query(function(listings) {
		$scope.listings = listings;
		console.log(listings);
	});
});