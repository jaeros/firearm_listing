var listing = angular.module('ListingController', []);

listing.controller('listingController', function($scope, Listings) {
	$scope.globalTest = "Listing Controller Text";

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
	/*$scope.listing = {
		title: "Like-new AK-47",
		gunTypeId: "abc123",
		customGunSpecs: {
			"Scope": "Bushnell",
			"Trigger": "Bravo"
		},
		description: "This is a like-new firearm. Bought " +
		"it a few years back, only took it to the range twice. " +
		"Price is firm.",
		price: 1024.13,
		photos: [
			{
				url: 'http://placehold.it/200x200',
				description: 'Side view'
			},
			{
				url: 'http://placehold.it/200x200',
				description: 'Front View'
			}
		],
		userId: "abc123",
		isSold: false,
		isActive: true
	};*/

	$scope.showPhoto = function(photo){
		$scope.currentPhoto = photo;
	};

	//Get related listings
	Listings.query(function(listings) {
		$scope.relatedListings = listings;
		//console.log(listings);
	});

	/*listing.pageViews += 1;
	listing.$update();*/
});