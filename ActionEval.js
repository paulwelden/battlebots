'use strict';
var Action = required('./actions');

module.exports = class actionEval {

	static eval(action, bot, gameState) {
		if (!(action instanceof Action)) {
			throw "action is garbage";
		}
		if (action.MoveTowardsPosition) {
			//TODO need to do hit detection bot -> bot and bot -> wall
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
