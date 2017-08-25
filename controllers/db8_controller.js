var express = require("express");
var app = express();
var path = require("path");
var body = require("body-parser");
var db = require("../models");
var http = require('http').Server(app);
var io = require('socket.io')(http);

var router = express.Router();

router.get("/", function(req, res){
	db.Debate.findAll({order: [["totalVotes", "DESC"]]}).then(function(result){
		res.render("index", {debates: result});
	});	
})

router.get("/archive", function(req, res){
	db.Debate.findAll({order: [
		["debate_topic", 'ASC']
		]}).then(function(result){
		res.render("archive", {debates: result});
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
		maxVotes: req.body.maxVotes,
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
				var winner = "";
				var archived = false;
				var updateDebate = {
					votesA: result.votesA + sum,
					totalVotes: result.totalVotes + 1
				}
				if (result.totalVotes + 1 >= result.maxVotes){
					archived = true;
					updateDebate.archived = true;
				}

				if (result.votesA > (result.maxVotes / 2)){
					winner = result.sideA;
					updateDebate.winner = result.sideA;
				}

				else {
					winner = result.sideB;
					updateDebate.winner = result.sideB;
				}

				db.Debate.update(updateDebate, {where: {
					id: id
				}
				}).then(function(result1){
					callback({val: result.votesA + sum,
						totalVotes: result.totalVotes +1,
						archived: archived,
						winner: winner}
					);
				});
			});
	
	}
}

