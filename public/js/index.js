var indexController = angular.module('IndexController', ['ui.bootstrap']);

indexController.controller('indexController', function($scope) {
	$scope.test = "Index controller text";

	console.log("Here!");

});