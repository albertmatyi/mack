App.component('coords').expose({
  dist: function(start, end) {
    if (!end) {
      end = start;
      start = Session.get('coords');
    }
    var R = 6371;
    var dLat = (end.latitude - start.latitude) * Math.PI / 180;
    var dLon = (end.longitude - start.longitude) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(start.latitude * Math.PI / 180) * Math.cos(end.latitude * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return Math.round(d * 1000);
  }
});
