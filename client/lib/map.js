App.component('map').expose({
  map: null,
  ready: function (callback){
  	Deps.autorun(function () {
  		if(Session.get('map.initialized')) {
  			callback();
  		}
  	});
  },
  init: function() {
    var coords = Session.get('coords');
    if (coords && !App.map.map && $('#map').length) {
      App.map.map = new GMaps({
        div: '#map',
        lat: coords.latitude,
        lng: coords.longitude
      });
      Session.set('map.initialized', true);
    }
  }
});
Session.set('map.initialized', false);
