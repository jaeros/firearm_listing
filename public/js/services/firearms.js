app.factory('Firearms', function($resource) {
  return $resource('/firearms',
  {
    firearmId: '@id'
  });
});
