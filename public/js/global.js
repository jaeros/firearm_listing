var indexController = angular.module('GlobalController', []);

indexController.controller('globalController', function($scope) {
	$scope.globalTest = "Global Controller Text";
});