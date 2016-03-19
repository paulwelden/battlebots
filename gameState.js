'use strict';

var coordinate = require('./coordinate');
var bot = require('./bot');
var constants = require('./constants');

module.exports = class gameState {
	constructor() {
		this.activeBots = {};
		this.projectiles = [];
	}

	createBot(name, color, ai) {
		var startingPosition = gameState.determineStartingPosition();
		return new bot(name, color, startingPosition, ai);
	}

	static determineStartingPosition() {
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
		return new coordinate(x, y);
	}
}
