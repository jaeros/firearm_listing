var addListing = angular.module('addListingController', []);

addListing.controller('addListingController', function($scope, $upload, $http, $timeout, $location, Listings) {
  this.init = function() {
    if(localStorage.getItem('user'))
      $scope.user = JSON.parse(localStorage.getItem('user'));
      else
        window.location = "/#";
    $scope.currentPhoto = {};
    $scope.newListing = {
      customGunSpecs: [],
      photos: [],
      userId : $scope.user._id,
      isActive: 'true',
      isSold: 'false'
    };
    $scope.isPreview = false;
    //$scope.file = {};
    $scope.files = [];
    $scope.editManufacturer = "";

    $http.get('/manufacturers').success(function(response){
      $scope.manufacturers = response;
    });
  };

  this.init();

  $scope.addListing = function() {
    console.log("Saving new listing: " + $scope.newListing);
    $http.post('listings/', $scope.newListing).
      success(function(data, status, headers, config) {
        console.log("Saved new listing: ", data);
        $scope.newListing = {
          photos: [],
          userId : $scope.user._id,
          isActive: 'true',
          isSold: 'false'
        };
        $location.path('/my-listings');
      }).
      error(function(data, status, headers, config) {
        console.log("Error creating new listing: ", data);
      });
  };

  $scope.showPreview = function() {
    if($scope.newListing.photos.length) {
     $scope.currentPhoto = $scope.newListing.photos[0]
    } else {
      $scope.currentPhoto = {
        url: 'http://placehold.it/200x200'
      };
    }
    $scope.isPreview = true;
  };

  $scope.hidePreview = function() {
    $scope.isPreview = false;
  }

  function uploadPhoto(file) {
      var completedUploads = 0;

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
        photo.name = file.name;
        console.log(photo);


        $scope.newListing.photos.push(photo);
        //$scope.newListing.$update({listingId: $scope.editListing._id});
      }).error(function(data, satus, headers, config) {
        console.log("Photo upload failed!");
        //show failure display
      });
  }

  $scope.deletePhoto = function(index) {
    $scope.newListing.photos.splice(index, 1);
  };

  $scope.showPhoto = function(index) {
    $scope.currentPhoto = $scope.newListing.photos[index];
  };

  //maybe
  $scope.addSpec = function() {

  };

  $scope.$watch('file', function() {
    if($scope.file !== undefined && $scope.file !== "") {
      console.log($scope.file);
      uploadPhoto($scope.file[0]);
    }
  });

  $scope.$watch('editManufacturer', function(newVal) {
    if($scope.newListing.customGunSpecs.length > 0) {
      angular.forEach($scope.newListing.customGunSpecs, function(spec) {
        if(spec.name === "manufacturer")
          spec.value = newVal.name;
        if(!spec.name) {
          spec.name = "manufacturer";
          spec.value = newVal.name;
        }
      });
    }
    else {
      $scope.newListing.customGunSpecs.push({name:"manufacturer", value:newVal.name});
    }
  });

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
  ];

  // $scope.$on('$locationChangeStart', function( event ) {
  //   var answer = confirm("Are you sure you want to leave this page?")
  //   if (!answer) {
  //       event.preventDefault();
  //   }
  // });

});
