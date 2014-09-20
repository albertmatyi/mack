Template.login.events({
  'tap .play.btn': function(e) {
  	e.preventDefault();
    var name = $('.player-name').val();
    var player = PlayersCollection.findOne(name);
    var coords = Session.get('coords');
    if (!player) {
      PlayersCollection.insert({
        name: name,
        coords: coords
      });
    } else {
      PlayersCollection.update(name, {
        $set: {
          coords: coords
        }
      });
    }
    Session.set('player.id', name);
    Session.set('player.name', name);
    Router.go('find');
  }
});

Template.login.helpers({
	coords: function () {
		return Session.get('coords');
	}
});