App.component('coords').expose({
});

Meteor.startup(function () {
	setInterval(function () {
		navigator.geolocation.getCurrentPosition(function(position) {
			Session.set('coords', position.coords);
			// console.log(navigator.platform, position.coords.latitude);
		});
	}, 1000);
});