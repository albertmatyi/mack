Meteor.startup(function() {
  var i = setInterval(function() {
    if ($('#main').length) {
      clearInterval(i);
      App.map.init();
    }
  }, 10)
});