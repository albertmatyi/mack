Router.map(function() {
  this.route('victory', {
    path: '/victory',
    data: function() {
      return {};
    },
    onAfterAction: function() {
      Session.set('map.onScreen', false);
    }
  });
});
