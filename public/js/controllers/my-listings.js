var myListings = angular.module('MyListingsController', []);

myListings.controller('myListingsController', function($scope, Listings, $timeout) {
	//$scope.globalTest = "My Listings Controller Text";
	// var tempDate = new Date("October 13, 2014 11:13:00").toString();
	//
	// /* Take a look at listings.js inside of the ../services folder. That is a nice
	//    little factory to give a framework for our resource requests. */
	//
	// /* If you are interested in the express routing going on behind the scenes,
	//    take a look at the ../../../routes folder, listings.js file. */
	//
	// console.log('listings!');
	// var data = [];
	// var newListing = {
	// 	id: 2,
	// 	userId: 11,
	// 	title: 'Barrett .50 cal',
	// 	firearmId: 9001,
	// 	customGunSpecs: {},
	// 	description: 'The beast.',
	// 	price: 3000.00,
	// 	photos: [
	// 	{
	// 		url: 'http://placehold.it/200x200',
	// 		description: 'Barrett .50 cal'
	// 	}
	// 	],
	// 	pageViews: 50,
	// 	listedOn: tempDate,
	// 	refreshedOn: tempDate,
	// 	Promotion: null,
	// 	isSold: false,
	// 	isActive: false
	// };
	//
	// /* This is the query without a callback or a promise
	//    Most of the time, when you try to set a variable to an angular request
	//    The data doesn't come back fast enough when you try to use that data
	//    Within the controller at some point */
	// data = Listings.query();
	// console.log(data);
	// /* However, this data can definitely still be useful it you want to use it
	//    in the html somewhere. If you don't need access to the data on the controller
	//    to do something with it, you can just do a call like this. */
	//
	//
	//
	// /* If you do need to access the data to do some processing, then you would do
	//    something like this. The next three queries do basically the same thing.
	//    The $promise is useful when you find yourself doing a lot of nested callback
	//    functions in the example immediately below this comment. With the $promise,
	//    you can make your code a lot cleaner by not using a ton of nested callback
	//    functions. */
	// Listings.query(function(listings) {
	// 	data = listings;
	// 	console.log(listings);
	// });
	//
	// Listings.query().$promise.then(function(listings) {
	// 	data = listings;
	// 	console.log(listings);
	// });
	//
	// data.$promise.then(function(listings) {
	// 	console.log(listings);
	// });
	//
	//
	// /* This last one here is an example of a GET that gets one particular listing,
	//    instead of a list of listings. The queries above will get you all of the
	//    listings. You can do $promise chaining on this get just like on the query above.
	// 	 In this example, we also see an update (put) happening, where we change something
	// 	 on the json object, then do a $update on it. This will update the backend
	// 	 appropriately. */
	// var listing = Listings.get({listingId: '547d37a7feb2d8e81a29cddd'}, function(listing) {
	// 	console.log(listing);
	//
	// 	listing.title = 'Like-new AK-47 UPDATED';
	//
	// 	listing.$update({listingId: listing._id});
	// });
	//
	// Listings.query(function(listings) {
	// 	console.log(listings);
	// });

	// console.log(listing);
	//
	// listing.newData = 'new stuff';
	//
	// Listings.update({listingId: listing._id}, listing);
	//
	// listing.$promise.then(function(listing) {
	// 	console.log(listing);
	// });
	//
	// /* This is how we add a new listing to the backend (post). */
	// Listings.save(newListing);
	//
	// Listings.get({listingId: 2}, function(listing) {
	// 	console.log(listing);
	// });


	// Actual implementation

	this.init = function() {
		if(localStorage.getItem('user'))
			$scope.user = JSON.parse(localStorage.getItem('user'));
		else
			window.location = "/#";

		$scope.editing = false;
		$scope.editListing = {};
		$scope.activeListings = 0;

		$scope.myListings = Listings.query({userId: $scope.user._id}, function(listings) {
			listings.forEach(function(listing) {
				if(listing.isActive)
					$scope.activeListings++;
			});
		});
	};

	this.init();

	$scope.startEditing = function(listing) {
		// $scope.oldListing = angular.copy(listing);
		// $scope.editListing = listing;
		// $scope.editing = true;

		window.location = "#/listings/" + listing._id + "?editing=true";
	};

	$scope.sellListing = function(listing) {
		var sold = window.confirm("Are you sure you want to mark this item as sold?");

		if(sold) {
			listing.isSold = true;

			listing.$update({listingId: listing._id});

			if($scope.editing)
				$scope.oldListing.isSold = true;
		}
	};

	$scope.deleteListing = function(listing) {
		var isDeleted = window.confirm("Are you sure you want to delete this listing?");

		if(isDeleted) {
			listing.isActive = false;

			listing.$update({listingId: listing._id});

			$scope.activeListings--;
		}
	};

	$scope.addListing = function() {
		window.location = '#/add-listing';
	};
});
