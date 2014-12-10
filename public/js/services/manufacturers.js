app.factory('Manufacturers', function($resource) {
  return $resource('/manufacturers/:manufacturersId',
  {
    firearmId: '@id'
  });
});
