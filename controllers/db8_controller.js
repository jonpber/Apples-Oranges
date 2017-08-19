var express = require("express");
var app = express();
var path = require("path");
var body = require("body-parser");
var db = require("../models");

var router = express.Router();

router.get("/", function(req, res){
	res.render("index", {});
})

router.get("/db8/:id", function(req, res){
	db.Debate.findOne({where: {
		id: req.params.id
	}}).then(function(result){
		console.log("result: "+ JSON.stringify(result));

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
	db.Debate.create({
		debate_topic: req.body.topic,
		sideA: req.body.sideA,
		sideB: req.body.sideB,
		chatLog: "",
		createdAt: Date.now(),
		updatedAt: Date.now()
	}).then(function(result){
		res.json(result);
	});
	
});

router.put("/api/burgers/:id?", function(req, res){

});

module.exports = router;