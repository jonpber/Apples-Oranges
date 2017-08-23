$(function () {
	var socket = io();
	
	// $('form').submit(function(){
	// 	socket.emit('chat message', $('#m').val());
	// 	$('#m').val('');
	// 	return false;
	// });
	// socket.on('chat message', function(msg){
	// 	$('#messages').append($('<li>').text(msg));
	// });

	$(".modal").iziModal({
		transitionIn: 'comingIn',
		transitionOut: 'comingOut',
	});

	$("body").on('click', '.createDebate', function (event) {
		event.preventDefault();
		$('#modal').iziModal('open');
	});

	$("body").on("click", ".arenaVote", function(event){
		console.log("click");
		// event.preventDefault();
		var val = 0;
		// if ($(this).attr("data-letter") === "a"){
		// 	val = -1;
		// }

		// else {
		// 	val = 1;
		// }
		socket.emit("vote", {
			id: $(this).attr("data-id"),
			value: val
		})
	})

	socket.on("response", function(debateBar){
		$("#bar" + debateBar.id).attr("style", "width: " + debateBar.val + "%");
	})

});