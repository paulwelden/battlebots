'use strict';
var actions = require('./actions');
var bot = require('./bot');
var gameState = require('./gameState');

module.exports = class actionEval {

	static eval(action, bot, gameState) {
		if (!(action instanceof actions)) {
			throw "action is garbage";
		}
		if (!(bot instanceof bot)) {
			throw "bot is garbage";
		}
		if (!(gameState instanceof gameState)) {
			throw "gameState is garbage";
		}
		var targetCoord = action.MoveTowardsPosition;
		if (targetCoord) {
			//TODO need to do hit detection bot -> bot and bot -> wall
			var angleTo = bot.angleTo(targetCoord);
			if (angleTo !== 0) {
				//TODO turn
			}
			var distanceTo = bot.distanceTo(targetCoord);
			if (distanceTo !== 0) {
				//TODO move
			}
		}
		if (action.AimTowardsPosition) {
			
		}
		if (action.Fire) {
			
		}
	}

	static needsToChangeHeading(moveToCoordinate, bot) {
		
	}

	static changeHeading(degrees, bot, gameState) {
		//change heading according to the bots defined heading rate
	}

	static changeAim(degress, bot, gameState) {
		//change facing according to bots defined facing rate
	}

	static moveForward(int, bot, gameState) {
		//move forwards according to the bots defined movement rate
	}

	static moveBackward(int, bot, gameState) {
		//move backwards according to the bots defined movement rate
	}

	static fire(bot, gameState) {
		//bang bang
	}
}
