var listing = angular.module('ListingController', []);

listing.controller('listingController', function($scope, Listings) {
	$scope.globalTest = "Listing Controller Text";

	//Get main listing
	/*var listing = Listings.get({listingId: }, function() {
		console.log(listing);
	});*/
	$scope.listing = {
		"_id": "547d11085d60586d0ee25e65",
		"title": "Like-new AK-47",
		"gunTypeId": "abc123",
		"customGunSpecs": {
			"Trigger": "Bravo",
			"Scope": "Bushnell"
		},
		"description": "This is a like-new firearm. Bought it a few years back, only took it to the range twice. Price is firm.",
		"price": 1024.13,
		"userId": "abc123",
		"isSold": false,
		"isActive": true,
		"promotion": {
			"targetSearch": [

			]
		},
		"listedOn": "2014-12-02T01:08:24.093Z",
		"pageViews": 0,
		"photos": [
			{
				"url": "http://placehold.it/200x200",
				"description": "Side view",
				"_id": "547d11085d60586d0ee25e67"
			},
			{
				"url": "http://placehold.it/200x200",
				"_id": "547d11085d60586d0ee25e66"
			}
		]
	};

	//Get related listings
	Listings.query(function(listings) {
		$scope.relatedListings = listings;
		console.log(listings);
	});

	/*listing.pageViews += 1;
	listing.$update();*/
});