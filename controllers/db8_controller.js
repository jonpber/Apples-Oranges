var express = require("express");
var app = express();
var path = require("path");
var body = require("body-parser");
var db = require("../models");
var http = require('http').Server(app);
var io = require('socket.io')(http);

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

router.put("/api/debates/:id/:side", function(req, res){
	var sum = 0;
	if (req.params.side === "a"){
		sum = -1;
	}

	else {
		sum = 1;
	}
	db.Debate.findOne({where:
		{
		id: req.params.id
	}
	}).then(function(result){
		db.Debate.update({
			votesA: result.votesA + sum
		}, {where: {
			id: result.id
		}
		}).then(function(result1){
		});
	})
});

module.exports = {
	router: router,
	getVal: function(id, callback){
		db.Debate.findOne({where:
		{
		id: id
		}
		}).then(function(result){
			callback(result.votesA);
		})
	},

	changeVal: function(id, sum, callback){
		db.Debate.findOne({where:
			{
			id: id
		}
		}).then(function(result){
				callback(result.votesA + sum);
				db.Debate.update({
					votesA: result.votesA + sum
				}, {where: {
					id: id
				}
				}).then(function(result1){
				});
			});
	
	}
}

