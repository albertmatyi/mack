var computation;

Template.find.helpers({
  coords: function() {
    return Session.get('coords');
  }
});
Router.onAfterAction(function() {
  App.map.ready(function() {
    computation = PlayersCollection.find().observe({
      added: function(player) {
        App.map.map.addMarker({
          lat: player.coords.latitude,
          lng: player.coords.longitude,
          title: player.name
        });
      }
    });
  });
});

Router.onStop(function() {
  if (computation) {
    computation.stop();
  }
  App.map.removeMarkers();
}, {
    only: ['find']
  });