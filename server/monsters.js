Meteor.methods({
  placeMonsters: function(maxlives, range) {
    maxlives = maxlives || 1;
    range = range || 0.0002;
    MonstersCollection.find().forEach(function(monster) {
      MonstersCollection.update(monster._id, {
        $set: {
          'coords.longitude': 11.5968006 + Math.random() * range - range / 2,
          'coords.latitude': 48.152337599999996 + Math.random() * range - range / 2,
          'lives': Math.floor(1 + Math.random() * maxlives),
          attackers: [],
          dead: false
        }
      });
    });
  }
});
Meteor.startup(function() {
  PlayersCollection.find().observe({
    changed: function(pl) {
      MonstersCollection.find({
        dead: {
          $ne: true
        }
      }).forEach(function(monster) {
        var attackers = monster.attackers;
        if (App.coords.dist(monster.coords, pl.coords) < 3) {
          if (attackers.indexOf(pl._id) === -1) {
            attackers.push(pl._id);
          }
        } else {
          attackers = _.filter(attackers, function(attacker) {
            return pl._id !== attacker;
          });
        }
        if (attackers.length >= monster.lives) {
          MonstersCollection.update(monster._id, {
            $set: {
              dead: true
            }
          });
          console.log('monster', monster._id, 'dead');
        } else {
          MonstersCollection.update(monster._id, {
            $set: {
              attackers: attackers
            }
          });
          console.log('monster', monster._id, 'attacked by', attackers);
        }
      });
    }
  });
});