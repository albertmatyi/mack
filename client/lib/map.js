App.component('map').expose({
  map: null,
  ready: function(callback) {
    Deps.autorun(function() {
      if (Session.get('map.initialized')) {
        this.stop();
        callback();
        console.log('map ready');
      }
    });
  },
  markerFor: function(id) {
    return _.where(App.map.map.markers, {
      title: id
    })[0];
  },
  removeMarker: function(id) {
    var mk = App.map.markerFor(id);
    if (mk) {
      mk.setMap(null);
    } else {
      console.warn('no marker for ', id);
    }
  },
  updateMarker: function(id, coords) {
    var marker = App.map.markerFor(id);
    if (!marker) {
      console.warn('no marker for', id, coords);
      return;
    }
    marker.setPosition({
      lat: coords.latitude,
      lng: coords.longitude
    });
  },
  init: function() {
    setTimeout(function() {
      Tracker.autorun(function(c) {
        var coords = Session.get('coords');
        if (coords && !App.map.map && $('#map').length) {
          console.log('Initializing maps.');
          c.stop();
          App.map.map = new GMaps({
            div: '#map',
            lat: coords.latitude,
            lng: coords.longitude,
            zoom: 20
          });
          Session.set('map.initialized', true);
          return;
        }
        if (!coords) {
          console.log('No coords');
        }
        if (App.map.map) {
          console.log('Map already defined');
        }
        if (!$('#map').length) {
          console.log('No #map found');
        }
      });
    }, 1);
  }
});
Session.set('map.initialized', false);