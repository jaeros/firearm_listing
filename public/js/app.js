var app = angular.module('firearm-listings', [
	'ngRoute',
	'GlobalController',
	'IndexController'
]);

app.config(['$routeProvider', '$httpProvider', 
	function($routeProvider, $httpProvider) {
		$routeProvider.when('/', {
			templateUrl: 'partials/index.html',
			controller: 'indexController'
		}).
		otherwise({
			redirectTo: '/'
		})
	}]);