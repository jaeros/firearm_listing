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
		$scope.currentPhotoIndex = 0;
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

	$scope.showPhoto = function(index){
		if(index > $scope.listing.photos.length) {
			index = 0;
		}
		$scope.currentPhotoIndex = index;
		$scope.currentPhoto = $scope.listing.photos[$scope.currentPhotoIndex];
		console.log($scope.currentPhotoIndex);
	};

	$scope.nextPhoto = function() {
		if(($scope.currentPhotoIndex + 1) >= $scope.listing.photos.length) {
			$scope.currentPhotoIndex = 0;
		} else{
			$scope.currentPhotoIndex++;
		}
		console.log($scope.currentPhotoIndex);
	}

	$scope.previousPhoto = function() {
		if($scope.currentPhotoIndex - 1 < 0) {
			$scope.currentPhotoIndex = $scope.listing.photos.length - 1;
		} else{
			$scope.currentPhotoIndex--;
		}
		console.log($scope.currentPhotoIndex);
	}

	//Get related listings
	Listings.query(function(listings) {
		$scope.relatedListings = listings;
		//console.log(listings);
	});

	/*listing.pageViews += 1;
	listing.$update();*/

	$scope.startEditing = function() {
		$scope.oldListing = angular.copy($scope.listing);
		$scope.editListing = $scope.listing;
		$scope.isEditing = true;
	};

	$scope.cancelEditing = function() {
		$timeout(function() {
			$scope.editListing = $scope.oldListing;
			$scope.listing = $scope.oldListing;

			$scope.isEditing = false;
		});
	};

	$scope.saveEditing = function(isValid) {
		if(isValid) {
			$scope.isEditing = false;

			var price = $scope.editListing.price.toString();

			price = price.replace(/[^0-9\.]+/g, '');
			$scope.editListing.price = parseFloat(price);

			$scope.editListing.$update({listingId: $scope.editListing._id}, function(listing) {
				console.log(listing);
			});
		}
	};

	$scope.removeSpec = function(customGunSpec) {
		for(var i = 0; i < $scope.editListing.customGunSpecs.length; i++) {
			if(customGunSpec === $scope.editListing.customGunSpecs[i]) {
				$scope.editListing.customGunSpecs.splice(i, i);
			}
		}
	};

	$scope.addSpec = function() {
		$scope.editListing.customGunSpecs.push({name:"", value:""});
	};
});
