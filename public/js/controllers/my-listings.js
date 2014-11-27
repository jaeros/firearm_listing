var myListings = angular.module('MyListingsController', []);

myListings.controller('myListingsController', function($scope, Listings, $timeout) {
	$scope.globalTest = "My Listings Controller Text";
	var tempDate = new Date("October 13, 2014 11:13:00").toString();

	/* Take a look at listings.js inside of the ../services folder. That is a nice
	   little factory to give a framework for our resource requests. */

	/* If you are interested in the express routing going on behind the scenes,
	   take a look at the ../../../routes folder, listings.js file. */

	console.log('listings!');
	var data = [];
	var newListing = {
		id: 2,
		userId: 11,
		title: 'Barrett .50 cal',
		firearmId: 9001,
		customGunSpecs: {},
		description: 'The beast.',
		price: 3000.00,
		photos: [
		{
			url: 'http://placehold.it/200x200',
			description: 'Barrett .50 cal'
		}
		],
		pageViews: 50,
		listedOn: tempDate,
		refreshedOn: tempDate,
		Promotion: null,
		isSold: false,
		isActive: false
	};

	/* This is the query without a callback or a promise
	   Most of the time, when you try to set a variable to an angular request
	   The data doesn't come back fast enough when you try to use that data
	   Within the controller at some point */
	data = Listings.query();
	console.log(data);
	/* However, this data can definitely still be useful it you want to use it
	   in the html somewhere. If you don't need access to the data on the controller
	   to do something with it, you can just do a call like this. */



	/* If you do need to access the data to do some processing, then you would do
	   something like this. The next three queries do basically the same thing.
	   The $promise is useful when you find yourself doing a lot of nested callback
	   functions in the example immediately below this comment. With the $promise,
	   you can make your code a lot cleaner by not using a ton of nested callback
	   functions. */
	Listings.query(function(listings) {
		data = listings;
		console.log(listings);
	});

	Listings.query().$promise.then(function(listings) {
		data = listings;
		console.log(listings);
	});

	data.$promise.then(function(listings) {
		console.log(listings);
	});


	/* This last one here is an example of a GET that gets one particular listing,
	   instead of a list of listings. The queries above will get you all of the
	   listings. You can do $promise chaining on this get just like on the query above.
		 In this example, we also see an update (put) happening, where we change something
		 on the json object, then do a $update on it. This will update the backend
		 appropriately. */
	var listing = Listings.get({listingId: 0}, function() {
		console.log(listing);

		listing.newData = 'new stuff';

		listing.$update();
	});

	listing.$promise.then(function(listing) {
		console.log(listing);
	});

	/* This is how we add a new listing to the backend (post). */
	Listings.save(newListing);

	Listings.get({listingId: 2}, function(listing) {
		console.log(listing);
	});
});
