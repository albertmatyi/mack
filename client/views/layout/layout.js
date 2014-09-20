$(document).on('touchmove', function(e) {
	e.preventDefault();
});

$(document).ready(function($) {
	// var url = 'http://192.168.21.119:8080/target/target-script-min.js#' + (navigator.userAgent.match(/iPad/i) !== null ? 'ipad' : 'normal');
	// console.log(url);
	// $('head').append('<script type="text/javascript" src="' + url + '"></script>');
});

Template.layout.helpers({
	mapOnScreen: function () {
		return Session.get('map.onScreen') ? 'on-screen':'off-screen';
	}
});