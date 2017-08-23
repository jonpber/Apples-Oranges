$(function () {
	var socket = io();
	var voted;
	if (localStorage.getItem("votes")){
		voted = JSON.parse(localStorage.getItem("votes"));
	}

	else {
		voted = {};
		localStorage.setItem("votes", JSON.stringify(voted));
	}

	function closeVote(){
		$("#vote" + $(".pageInfo").attr("data-id")).html("<h2>Thanks for voting!</h2>");
	}

	if ($(".pageInfo").attr("data-id") !== null && voted[$(".pageInfo").attr("data-id")] === true){
		closeVote();
	}

	
	
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
		voted[$(this).attr("data-id")] = true;
		console.log(JSON.stringify(voted));
		localStorage.setItem("votes", JSON.stringify(voted));
		closeVote();
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