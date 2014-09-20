Session.set('player.name', 'Jack');
Session.set('player.id', 'Jack');
Template.login.events({
  'tap .play.btn': function(e) {
    e.preventDefault();
    var name = $('.player-name').val();
    var player = PlayersCollection.findOne(name);
    var coords = Session.get('coords');
    if (!player) {
      PlayersCollection.insert({
        _id: name,
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
    console.log(PlayersCollection.findOne(name));
    Session.set('player.id', name);
    Session.set('player.name', name);
    Router.go('find');
  }
});

Template.login.helpers({
  coords: function() {
    return _.extend({
      delta: Session.get('coords.delta')
    }, Session.get('coords'));
  }
});