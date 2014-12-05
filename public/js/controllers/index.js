var index = angular.module('IndexController', []);

index.controller('indexController', function($scope, Listings) {
	$scope.globalTest = "Index Controller Text";

	var url = window.location.href;
	var listingId = url.substring(url.lastIndexOf('/')+1);
	
	//Get main listing
	Listings.get({listingId: listingId}, function(listing){
		listing.pageViews += 1;
		$scope.listing = listing;
		$scope.currentPhoto = $scope.listing.photos[0];
		console.log(listing);
		listing.$update({listingId: listing._id});
	});

	$scope.showPhoto = function(photo){
		$scope.currentPhoto = photo;
	};

	//Get related listings
	Listings.query(function(listings) {
		$scope.relatedListings = listings;
	});

});