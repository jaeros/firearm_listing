var myListings = angular.module('MyListingsController', []);

myListings.controller('myListingsController', function($scope, Listings) {
	$scope.globalTest = "My Listings Controller Text";

	console.log('listings!');

	Listings.query(function(listings) {
		console.log(listings);
	});

	Listings.get({listingId: 0}, function(listing) {
		console.log(listing);
	});
});
