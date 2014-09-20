UI.body.rendered = function() {
	$('body').hammer({
		swipe: true,
		swipe_max_touches: 10,
		swipe_min_touches: 1,
		swipe_velocity: 0.1
	});
};
