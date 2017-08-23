$(function () {
	var socket = io();

	

  firebase.initializeApp(config);

	$(".modal").iziModal({
		transitionIn: 'comingIn',
		transitionOut: 'comingOut',
	});


});