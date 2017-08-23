$(function () {
	var socket = io();
	
	$('#debateChat').submit(function(){
		socket.emit('chat message', {
			message: $('#m').val(),
			id: $(this).attr("data-id")
	});
		$('#m').val('');
		return false;
	});

	socket.on('chat message', function(msg){
		$('#messages' + msg.id).append($('<li>').text(msg.message));
	});

	socket.on("response", function(debateBar){
		$("#bar" + debateBar.id).attr("style", "width: " + debateBar.val + "%");
	});

	$(".modal").iziModal({
		transitionIn: 'comingIn',
		transitionOut: 'comingOut',
	});

	$("body").on('click', '.createDebate', function (event) {
		event.preventDefault();
		$('#modal').iziModal('open');
	});

	$("body").on("click", ".arenaVote", function(event){
		event.preventDefault();
		var val = 0;
		if ($(this).attr("data-letter") === "a"){
			val = -1;
		}

		else {
			val = 1;
		}
		socket.emit("vote", {
			id: $(this).attr("data-id"),
			value: val
		})
	})



});