var playersComputation;
var playerComputation;
var monsterComputation;

Template.arena.helpers({
  coords: function() {
    return Session.get('coords');
  }
});

var watchPlayers = function() {
  playersComputation = PlayersCollection.find().observe({
    added: function(player) {
      if (!App.map.markerFor(player.id)) {
        App.map.map.addMarker({
          lat: player.coords.latitude,
          lng: player.coords.longitude,
          title: player._id,
          icon: '/icons/' + player._id + '.png'
        });
      }
    },
    changed: function(player) {
      console.log('view');
      App.map.updateMarker(player._id, player.coords);
    }
  });
};

var watchPlayerLoaction = function() {
  playersComputation = Deps.autorun(function() {
    var pid = Session.get('player.id');
    if (!pid) {
      return;
    }
    var coords = Session.get('coords');
    PlayersCollection.update(pid, {
      $set: {
        'coords.latitude': coords.latitude,
        'coords.longitude': coords.longitude
      }
    });
    console.log('Updating', pid, coords);
  });
};

var watchMonsters = function() {
  monsterComputation = MonstersCollection.find().observe({
    added: function(monster) {
      if (!App.map.markerFor(monster.id)) {
        App.map.map.addMarker({
          lat: monster.coords.latitude,
          lng: monster.coords.longitude,
          title: monster._id
        });
      }
    },
    changed: function(monster) {
      console.log('view');
      if (!MonstersCollection.findOne({dead:false})) {
        Router.go('victory');
      }
      if (monster.lives) {
        App.map.updateMarker(monster._id, monster.coords);
      } else {
        App.map.removeMarker(monster._id);
      }
    }
  });
};

Router.onAfterAction(function() {
  if (!playersComputation) {
    Meteor.defer(watchPlayers);
  }
  if (!playerComputation) {
    Meteor.defer(watchPlayerLoaction);
  }
  if (!monsterComputation) {
    Meteor.defer(watchMonsters);
  }
}, {
  only: ['arena']
});

Router.onStop(function() {
  if (playersComputation) {
    playersComputation.stop();
  }
  if (playerComputation) {
    playerComputation.stop();
  }
  if (monsterComputation) {
    monsterComputation.stop();
  }
}, {
  only: ['find']
});

Template.arena.events({
  'tap .logo': function () {
    Router.go('/');
  }
});
