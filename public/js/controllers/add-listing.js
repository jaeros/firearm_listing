var addListing = angular.module('addListingController', []);

addListing.controller('addListingController', function($scope, Listings) {
  this.init = function() {
    this.newListing = {};
  };

  this.init();

  $scope.addListing = function() {

  };

  $scope.previewListing = function() {

  };

  $scope.uploadPhotos = function() {

  };

  //maybe
  $scope.addSpec = function() {

  };

  $scope.firearmSpecs = [
    {
      id: "1",
      manufacturer: "Glock",
      model: "19",
      caliber: "9mm",
      capacity: "15",
      action: "semi-auto",
      barrelLength: "102 mm/4.01 in.",
      length: "187 mm / 7.36 in."
    },
    {
      id: "2",
      manufacturer: "Glock",
      model: "22",
      caliber: ".40",
      capacity: "15",
      action: "semi-auto",
      barrelLength: "114 mm / 4.49 in.",
      length: "204 mm / 8.03 in."
    },
    {
      id: "3",
      manufacturer: "Century Arms International",
      model: "WASR-10",
      caliber: "7.62x39mm",
      capacity: "30",
      action: "semi-auto",
      barrelLength: "415 mm / 16.3 in.",
      length: "880 mm / 34.6 in."
    },
    {
      id: "4",
      manufacturer: "DPMS Firearms",
      model: "Carbine",
      caliber: ".223/5.56 NATO",
      capacity: "15",
      action: "semi-auto",
      barrelLength: "16 in.",
      length: "36.5 in."
    }
  ]
});
