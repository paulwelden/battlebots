module.exports = class gameState {
	constructor() {
		this.activeBots = [];
		this.projectiles = [];
	}

	static createBot(name, color, type, ai) {
		var startingPosition = determineStartingPosition();
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
		var constants = required('./constants');
		var coordiante = required('./coordinate');
		var x = Math.floor(
				(
					Math.random() * (constants.WORLD_WIDTH -
					(constants.BOT_SIZE / 2)) + (constants.BOT_SIZE / 2)
				)
			);
		var y = Math.floor(
				(
					Math.random() * (constants.WORLD_WIDTH -
					(constants.BOT_SIZE / 2)) + (constants.BOT_SIZE / 2)
				)
			);
		var coord = new coordiante(x, y);
		return coord;
	}
}
