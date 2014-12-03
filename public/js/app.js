var app = angular.module('firearm-listings', [
	'ngRoute',
	'ngResource',
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

// Interceptor for http calls to use authentication
app.factory('authInterceptor', function($rootScope, $q, $window, $location) {
	return {
		request: function(config) {
			config.headers = config.headers || {};

			if($window.sessionStorage.token)
				config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;

			return config;
		},
		responseError: function(rejection) {
			if(rejection.data == "Unauthorized")
			{
				console.log("Response error 401. Redirecting to login.");
				$location.path('/');
			}
			return $q.reject(rejection);
		}
	}
});

app.config(['$routeProvider', '$httpProvider',
	function($routeProvider, $httpProvider) {

		// ROUTES
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
		when('/contact', {
			templateUrl: 'partials/contact.html',
			controller: 'contactController'
		}).
		when('/add-listing', {
			templateUrl: 'partials/add-listing.html',
			controller: 'addListingController'
		}).
		when('/admin', {
			templateUrl: 'partials/admin.html',
			controller: 'adminController'
		}).
		otherwise({
			redirectTo: '/'
		});

		// AUTHENTICATION INTERCEPTOR
		$httpProvider.interceptors.push('authInterceptor');
	}]);
