var index = angular.module('IndexController', []);

index.controller('indexController', function($scope, Listings) {
	$scope.globalTest = "Index Controller Text";

	//Get related listings
	Listings.query(function(listings) {
		$scope.listings = listings;
		console.log(listings);
	});
});