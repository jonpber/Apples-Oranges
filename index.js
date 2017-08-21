var express = require("express");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");
var exphbs = require("express-handlebars");
var db = require("./models");

var router = require(path.join(__dirname, "controllers", "db8_controller.js"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(path.join('public')));

app.use("/", router);

var port = process.env.PORT || 7000;

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

db.sequelize.sync().then(function(){
	http.listen(port, function(error){
		if (error){
			return console.log(error);
		}

		console.log("server is listening on http://localhost:%s", port);
	});
});