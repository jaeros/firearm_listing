var myListings = angular.module('MyListingsController', []);

myListings.controller('myListingsController', function($scope, Listings) {
	$scope.globalTest = "My Listings Controller Text";

	/* Take a look at listings.js inside of the ../services folder. That is a nice
	   little factory to give a framework for our resource requests. */

	/* If you are interested in the express routing going on behind the scenes,
	   take a look at the ../../../routes folder, listings.js file. */

	console.log('listings!');

	/* This is the query without a callback or a promise
	   Most of the time, when you try to set a variable to an angular request
	   The data doesn't come back fast enough when you try to use that data
	   Within the controller at some point */
	var data = Listings.query();
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

	console.log(data);

	Listings.query().$promise.then(function(listings) {
		data = listings;
		console.log(listings);
	});

	console.log(data);

	data.$promise.then(function(listings) {
		console.log(listings);
	});


	/* This last one here is an example of a GET that gets one particular listing,
	   instead of a list of listings. The queries above will get you all of the
	   listings. You can do $promise chaining on this get just like on the query above. */
	Listings.get({listingId: 0}, function(listing) {
		data = listing;
		console.log(listing);
	});

	console.log(data);


	// More examples to come.
});
