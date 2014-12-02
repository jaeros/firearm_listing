app.factory('Users', function($resource) {
  return $resource('/users/:userId',
  {
    userId: '@id'
  },
  {
    save: {
      url: '/users'
    },
    update: {
      method: 'PUT'
    }
  });
});
