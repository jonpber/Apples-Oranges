module.exports = function(sequelize, Datatypes){
	var Debate = sequelize.define("Debate", {
		debate_topic: {
			type: Datatypes.STRING,
			allowNull: false,
		},
		sideA: {
			type: Datatypes.STRING,
			defaultValue: ""
		},
		votesA: {
			type: Datatypes.INTEGER,
			defaultValue: 0
		},

		sideB: {
			type: Datatypes.STRING,
			defaultValue: ""
		},
		votesB: {
			type: Datatypes.INTEGER,
			defaultValue: 0
		},

		chatLog: {
			type: Datatypes.TEXT
		}
	});

	return Debate;

}

