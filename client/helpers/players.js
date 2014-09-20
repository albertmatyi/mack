Template.registerHelper('coords', function() {
  return _.extend({
    delta: Session.get('coords.delta')
  }, Session.get('coords'));
});
Template.registerHelper('player', function() {
  return PlayersCollection.findOne(Session.get('player.id'));
}
);