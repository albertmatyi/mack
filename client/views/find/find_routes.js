Router.map(function() {
  this.route('find', {
    path: '/find',
    onBeforeAction: function() {
      if (!Session.get('player.id')) {
        this.redirect('/');
      }
    },
    data: function() {
      var pid = Session.get('player.id');
      return {
        player: PlayersCollection.find(pid)
      };
    },
    onAfterAction: function() {
      App.map.init();
    }
  });
});
