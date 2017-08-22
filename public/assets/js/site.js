$(function () {
	var socket = io();
	$('form').submit(function(){
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	});
	socket.on('chat message', function(msg){
		$('#messages').append($('<li>').text(msg));
	});

	$("#modal").iziModal({
		transitionIn: 'comingIn',
		transitionOut: 'comingOut',
	});

	$("body").on('click', '.createDebate', function (event) {
		event.preventDefault();
		$('#modal').iziModal('open');
	});

});