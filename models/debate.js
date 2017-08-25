module.exports = function(sequelize, Datatypes){
	var Debate = sequelize.define("Debate", {
		debate_topic: {
			type: Datatypes.STRING,
			allowNull: false,
		},
		sideA: {
			type: Datatypes.STRING,
			defaultValue: "",
			allowNull: false,
		},
		votesA: {
			type: Datatypes.INTEGER,
			defaultValue: 50
		},

		sideB: {
			type: Datatypes.STRING,
			defaultValue: "",
			allowNull: false,
		},
		maxVotes: {
			type: Datatypes.INTEGER,
			defaultValue: 11
		},

		totalVotes: {
			type: Datatypes.INTEGER,
			defaultValue: 0
		},

		chatLog: {
			type: Datatypes.TEXT
		},

		archived: {
			type: Datatypes.BOOLEAN,
			defaultValue: false
		},

		winner: {
			type: Datatypes.STRING,
			defaultValue: ""
		}
	});

	return Debate;

}

