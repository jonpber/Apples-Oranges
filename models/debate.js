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
			defaultValue: 50
		},

		sideB: {
			type: Datatypes.STRING,
			defaultValue: ""
		},
		votesB: {
			type: Datatypes.INTEGER,
			defaultValue: 50
		},

		chatLog: {
			type: Datatypes.TEXT
		},

		archived: {
			type: Datatypes.BOOLEAN,
			defaultValue: false
		}
	});

	return Debate;

}

