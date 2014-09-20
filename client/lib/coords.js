
Meteor.startup(function() {
  navigator.geolocation.watchPosition(function(position) {
    var prevCoords = Session.get('coords');
    var data = _.extend({
      delta: (prevCoords ? App.coords.dist(prevCoords, position.coords) : 0)
    }, position.coords);
    data = _.pick(data, 'delta', 'longitude', 'latitude');
    console.log(data);
    Session.set('coords', data);
  }, function() {
      console.warn(arguments);
    }, {
      enableHighAccuracy: true
    });
});