var indexController = angular.module('IndexController', []);

indexController.controller('indexController', function($scope) {
	$scope.test = "Index controller text";

	console.log("Here!");

});