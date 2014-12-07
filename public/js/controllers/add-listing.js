var addListing = angular.module('addListingController', []);

addListing.controller('addListingController', function($scope, $upload, $http, Listings) {
  this.init = function() {
    $scope.user = JSON.parse(localStorage.getItem('user'));
    $scope.newListing = {
      userId : $scope.user._id
    };
    //$scope.file = {};
    $scope.files = [];
  };

  this.init();

  $scope.addListing = function() {
    if($scope.files.length) {
      $scope.uploadPhotos();
    } else {
      saveNewListing();
    }
  };

  $scope.previewListing = function() {

  };

  $scope.uploadPhotos = function() {
    for(var i = 0; i < $scope.files.length; i++) {
      var file = $scope.files[i];
      var completedUploads = 0;
      $scope.newListing.photos = [];

      console.log($scope.editListing);

      $scope.upload = $upload.upload({
        url: '/upload',
        method: 'POST',
        headers: {'Authorization': 'Bearer' + localStorage.getItem('token')},
        withCredentials: true,
        data: {userId: $scope.user._id},
        file: file
      }).success(function(data, status, headers, config) {
        var photo = {};
        photo.url = data.pathname.replace('\\', '/');


        $scope.newListing.photos.push(photo);
        completedUploads++;
        //$scope.newListing.$update({listingId: $scope.editListing._id});
        if(completedUploads == $scope.files.length) {
          saveNewListing();
        }
      }).error(function(data, satus, headers, config) {
        console.log("Photo upload failed!");
        completedUploads++;
        if(completedUploads == $scope.files.length) {
          saveNewListing();
        }
      });
    }
  };

  $scope.deletePhoto = function(index) {
    $scope.files.splice(index, 1);
  };

  //maybe
  $scope.addSpec = function() {

  };

  $scope.$watch('file', function() {
    if($scope.file !== undefined && $scope.file !== "") {
      console.log($scope.file);
      $scope.files.push($scope.file[0]);
    }
  });

  function saveNewListing() {
    console.log("Saving new listing: " + $scope.newListing);
    $http.post('listings/', $scope.newListing).
      success(function(data, status, headers, config) {
        console.log("Saved new listing: ", data);
      }).
      error(function(data, status, headers, config) {
        console.log("Error creating new listing: ", data);
      });
  }

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
