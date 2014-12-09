var index = angular.module('IndexController', []);

index.controller('indexController', function($scope, Listings, Manufacturers) {
	$scope.globalTest = "Index Controller Text";

	//Get related listings
	Listings.query(function(listings) {
		$scope.listings = listings;
		console.log(listings);
	});
	//Manufacturers.query(function(manufacturers)) {
	//	$scope.manufacturers = manufacturers;
	//	console.log(manufacturers);
	//});

	//var myData = [{id: manufacturerId, label: {{manufacturers_value}} }];
	//$(".myDropdownCheckbox").dropdownCheckbox({
	//  data: myData,
	//  title: "Manufacturers"
	//});
});

//browse tab
	index.controller('TabController', function(){
this.tab = 1;

this.setTab = function(newValue){
  this.tab = newValue;
};

this.isSet = function(tabName){
  return this.tab === tabName;
};
});