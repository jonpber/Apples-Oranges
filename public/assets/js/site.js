$(function () {
	var socket = io();
	var voted;
	var color = 0;
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
		$('#messages' + msg.id).append($('<li class="chatMessage">').text(msg.message));
		$('#messages' + msg.id).animate({ scrollTop: $('#messages' + msg.id)[0].scrollHeight}, 1000);
	});

	socket.on("response", function(debateBar){
		$("#bar" + debateBar.id).attr("style", "width: " + debateBar.val + "%");
		$("#totalVotes" + debateBar.id).text("Total Votes: " + debateBar.totalVotes);
		console.log(debateBar.archived)
		if (debateBar.archived){
			setTimeout(function(){
				$("#vote" + $(".pageInfo").attr("data-id")).html("<h2>" + debateBar.winner + " Wins!</h2>");
			}, 500);
		}
	});

	$(".modal").iziModal({
		transitionIn: 'comingIn',
		transitionOut: 'comingOut',
	});

	$("body").on('click', '.createDebate', function (event) {
		event.preventDefault();
		$('#modal').iziModal('open');
	});

	$("body").on('click', '.createDebateNav', function (event) {
		event.preventDefault();
		$('#modal').iziModal('open');
	});

	$("body").on("click", ".arenaVote", function(event){
		event.preventDefault();
		voted[$(this).attr("data-id")] = true;
		localStorage.setItem("votes", JSON.stringify(voted));
		closeVote();
		var val = 0;
		if ($(this).attr("data-letter") === "a"){
			val = 1;
		}

		else {
			val = -1;
		}
		socket.emit("vote", {
			id: $(this).attr("data-id"),
			value: val
		})
	})



});