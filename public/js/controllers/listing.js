var listing = angular.module('ListingController', []);

listing.controller('listingController', function($scope, Listings, $location, $routeParams, $timeout) {
	$scope.globalTest = "Listing Controller Text";
	$scope.isOwner = true;
	$scope.isEditing = false;

	this.init = function() {
		if($location.search().editing)
			$scope.isEditing = $location.search().editing;
	};

	this.init();

	var listingId = $routeParams.listingId;
	//Get main listing
	var listing = Listings.get({listingId: listingId}, function(listing){
		listing.pageViews += 1;
		$scope.listing = listing;
		$scope.currentPhoto = $scope.listing.photos[0];
		//console.log(listing);
		listing.$update({listingId: listing._id});

		// if(listing.userId === $scope.user._id)
		// 	$scope.isOwner = true;
		// else
		// 	$scope.isOwner = false;

		if($location.search().editing) {
				$scope.editListing = listing;
		}
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

	$scope.startEditing = function() {
		$scope.oldListing = angular.copy(listing);
		$scope.editListing = listing;
		$scope.isEditing = true;
	};

	$scope.cancelEditing = function() {
		$scope.isEditing = false;
	};

	$scope.saveEditing = function() {
		$scope.isEditing = false;

		var price = $scope.editListing.price.toString();

		price = price.replace(/[^0-9\.]+/g, '');
		$scope.editListing.price = parseFloat(price);

		$scope.editListing.$update({listingId: $scope.editListing._id}, function(listing) {
			console.log(listing);
		});
	};
});
