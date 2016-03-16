'use strict';

module.exports = class gameState {
	constructor() {
		this.activeBots = [];
		this.projectiles = [];
	}

	createBot(name, color, type, ai) {
		var startingPosition = gameState.determineStartingPosition();
		var bot = require('./bot');
		var newBot;
		switch(type) {
			case "blueBot":
				newBot = new bot(name, color, startingPosition, ai);
				break;
			default:
				newBot = new bot(name, color, startingPosition, ai);
		}
		return newBot;
	}

	static determineStartingPosition() {
		var constants = require('./constants');
		var x = Math.floor(
				(
					Math.random() * (constants.WORLD_WIDTH() -
					(constants.BOT_SIZE() / 2)) + (constants.BOT_SIZE() / 2)
				)
			);
		var y = Math.floor(
				(
					Math.random() * (constants.WORLD_WIDTH() -
					(constants.BOT_SIZE() / 2)) + (constants.BOT_SIZE() / 2)
				)
			);

		var coordinate = require('./coordinate');
		var coord = new coordinate(x, y);
		return coord;
	}
}
