var listing = angular.module('ListingController', []);

listing.controller('listingController', function($scope, Listings, $location, $routeParams, $timeout, $upload) {
	$scope.globalTest = "Listing Controller Text";
	$scope.isOwner = false;
	$scope.isEditing = false;
	$scope.files = [];

	this.init = function() {
		$scope.user = JSON.parse(localStorage.getItem('user'));

		if($location.search().editing)
			$scope.isEditing = $location.search().editing;
	};

	this.init();

	var listingId = $routeParams.listingId;
	//Get main listing
	var listing = Listings.get({listingId: listingId}, function(listing){
		if($scope.user && $scope.user._id === listing.userId)
			$scope.isOwner = true;

		listing.pageViews += 1;
		$scope.listing = listing;
		$scope.currentPhoto = $scope.listing.photos[0];
		//console.log(listing);
		$scope.currentPhotoIndex = 0;
		listing.$update({listingId: listing._id});

		if($location.search().editing) {
			$scope.oldListing = angular.copy(listing);
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
	};

	$scope.previousPhoto = function() {
		if($scope.currentPhotoIndex - 1 < 0) {
			$scope.currentPhotoIndex = $scope.listing.photos.length - 1;
		} else{
			$scope.currentPhotoIndex--;
		}
		console.log($scope.currentPhotoIndex);
	};

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

			var description = $scope.editListing.description;

			console.log(description);

			while(description.search("<p><span><br\/><\/span><\/p><p><span><br\/><\/span><\/p>") != -1) {
				description = description.replace('<p><span><br\/><\/span><\/p><p><span><br\/><\/span><\/p>', '<p><span><br\/><\/span><\/p>');
			}

			while(description.search(/\s\s/) != -1) {
				description = description.replace(/\s\s/, " ");
			}

			$scope.editListing.description = description;

			$scope.editListing.$update({listingId: $scope.editListing._id});
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

	/*jshint loopfunc: true */
	$scope.$watch('files', function() {
		for(var i = 0; i < $scope.files.length; i++) {
			var file = $scope.files[i];

			$scope.upload = $upload.upload({
				url: '/upload',
				method: 'POST',
				headers: {'Authorization': 'Bearer' + localStorage.getItem('token')},
				withCredentials: true,
				data: {userId: $scope.user._id},
				file: file
			}).success(function(data, status, headers, config) {
				var photo = {};
				photo.url = data.pathname;

				$scope.editListing.photos.push(photo);
				$scope.editListing.$update({listingId: $scope.editListing._id});
			});
		}
	});
});
