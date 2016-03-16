'use strict';

var coordinate = require('./coordinate');
var bot = require('./bot');
var constants = require('./constants');

module.exports = class gameState {
	constructor() {
		this.activeBots = {};
		this.projectiles = [];
	}

	createBot(name, color, type, ai) {
		var startingPosition = gameState.determineStartingPosition();
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
		var coord = new coordinate(x, y);
		return coord;
	}
}
