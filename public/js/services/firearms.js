app.factory('Firearms', function($resource) {
  return $resource('/firearms/:firearmId',
  {
    firearmId: '@id'
  });
});
