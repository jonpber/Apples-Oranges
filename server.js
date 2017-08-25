var body = require("body-parser");
var method = require("method-override");
var express = require("express");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");
var exphbs = require("express-handlebars");
var db = require("./models");
var http = require('http').Server(app);
var io = require('socket.io')(http);

var router = require(path.join(__dirname, "controllers", "db8_controller.js")).router;
var changeVal = require(path.join(__dirname, "controllers", "db8_controller.js")).changeVal;
// var increaseVal = require(path.join(__dirname, "controllers", "db8_controller.js")).increaseVal;

var port = process.env.PORT || 7000;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(method("_method"));

app.use(body.json()); // support json encoded bodies
app.use(body.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(path.join('public')));

app.use("/", router);

io.on('connection', function(socket){
	socket.on('disconnect', function(){
		console.log('user disconnected');
	})

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});

	socket.on('vote', function(id) {
		changeVal(id.id, id.value, function(response){
				io.emit("response", {id: id.id,
					val: response.val,
					totalVotes: response.totalVotes,
					archived: response.archived,
					winner: response.winner
					}
					);
		});
	});

	socket.on("debate Update", function(){
		console.log("debate should update")
	})
});

db.sequelize.sync().then(function(){
	http.listen(port, function(error){
		if (error){
			return console.log(error);
		}
		console.log("server is listening on http://localhost:%s", port);
	});
});
