var express = require("express");
var app = express();
var path = require("path");
var body = require("body-parser");
var db = require("../models");
// var socket = io.connect();

var router = express.Router();

router.get("/", function(req, res){
	db.Debate.findAll({}).then(function(result){
		res.render("index", {debates: result});
	});
	
})

router.get("/db8/:id", function(req, res){
	db.Debate.findOne({where: {
		id: req.params.id
	}}).then(function(result){
		// socket.emit('room', req.params.id);
		res.render("arena", {
			debate: result
		});
	});
})

router.get("/api/debates", function(req, res){
	db.Debate.findAll({}).then(function(result){
		res.json(result);
	});
});

router.post("/api/debates", function(req, res){
	console.log(req.body);
	db.Debate.create({
		debate_topic: req.body.topic,
		sideA: req.body.sideA,
		sideB: req.body.sideB,
		chatLog: "",
		createdAt: Date.now(),
		updatedAt: Date.now()
	}).then(function(result){
		res.redirect("/");
	});
	
});

router.put("/api/burgers/:id?", function(req, res){

});

module.exports = router;