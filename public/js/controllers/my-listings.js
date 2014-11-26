var myListings = angular.module('MyListingsController', []);

myListings.controller('myListingsController', function($scope, Listings) {
	$scope.globalTest = "My Listings Controller Text";

	console.log('listings!');

	// This is the query without a callback or a promise
	// Most of the time, when you try to set a variable to an angular request
	// The data doesn't come back fast enough when you try to use that data
	// Within the controller at some point
	var data = Listings.query();
	console.log(data);

	Listings.query(function(listings) {
		data = listings;
		console.log(listings);
	});

	console.log(data);

	Listings.get({listingId: 0}, function(listing) {
		data = listing;
		console.log(listing);
	});

	console.log(data);

	Listings.query().$promise.then(function(listings) {
		data = listings;
		console.log(listings);
	});

	console.log(data);
});
