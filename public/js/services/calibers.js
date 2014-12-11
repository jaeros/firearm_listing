app.factory('Calibers', function($resource) {
  return $resource('/calibers/:caliberId',
  {
    caliberId: '@id'
  });
});
