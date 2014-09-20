Router.map(function() {
  this.route('arena', {
    path: '/arena',
    onBeforeAction: function() {
      // if (!Session.get('player.id')) {
      //   this.redirect('/');
      // }
    },
    data: function() {
      var pid = Session.get('player.id');
      return {
        player: PlayersCollection.find(pid)
      };
    },
    onAfterAction: function() {
      Session.set('map.onScreen', true);
    }
  });
});
Session.set('map.onScreen', false);
