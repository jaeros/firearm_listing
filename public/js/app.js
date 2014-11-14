var app = angular.module('firearm-listings', [
	'ngRoute',
	'GlobalController',
	'IndexController',
	'AccountController',
	'AdminController',
	'ContactController',
	'LegalController',
	'ListingController',
	'MyListingsController',
	'RegisterController',
	'SearchController'
]);

app.config(['$routeProvider', '$httpProvider', 
	function($routeProvider, $httpProvider) {
		$routeProvider.when('/', {
			templateUrl: 'partials/index.html',
			controller: 'indexController'
		}).
		when('/register', {
			templateUrl: 'partials/register.html',
			controller: 'registerController'
		}).
		when('/account', {
			templateUrl: 'partials/account.html',
			controller: 'accountController'
		}).
		when('/my-listings', {
			templateUrl: 'partials/my-listings.html',
			controller: 'myListingsController'
		}).
		when('/search', {
			templateUrl: 'partials/search.html',
			controller: 'searchController'
		}).
		when('/listing/:listingId', {
			templateUrl: 'partials/listing.html',
			controller: 'listingController'
		}).
		when('/legal', {
			templateUrl: 'partials/legal.html',
			controller: 'legalController'
		}).
		when('contact', {
			templateUrl: 'partials/contact.html',
			controller: 'contactController'
		}).
		when('/admin', {
			templateUrl: 'partials/admin.html',
			controller: 'adminController'
		}).
		otherwise({
			redirectTo: '/'
		})
	}]);