Template.login.events({
  'tap .ranger': function(e) {
    e.preventDefault();
    var coords = Session.get('coords');
    PlayersCollection.update(this._id, {
      $set: {
        coords: coords
      }
    });
    // console.log(PlayersCollection.findOne(name));
    Session.set('player.id', this._id);
    Router.go('arena');
  }
});

Template.rangers.helpers({
  rangers: function() {
    return PlayersCollection.find();
  }
});
Template.ranger.rendered = function() {
  var $img = $(this.find('img'));
  // $img.width($img.height());
};