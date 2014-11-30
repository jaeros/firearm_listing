app.factory('Listings', function($resource) {
  return $resource('/listings/:listingId',
  {
    listingId: '@id'
  },
  {
    update: {
      method: 'PUT'
    }
  });
});