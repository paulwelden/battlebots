'use strict';
var actions = require('./actions');
var bot = require('./bot');
var gameState = require('./gameState');

var Action = require('./actions');
var Bot = require('./bot');
var GameState = require('./gameState');
var Projectile = require('./Projectile');

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
			var angleTo = bot.angleToMove(targetCoord);
			var distanceTo = bot.distanceTo(targetCoord);
			var turnTime = Math.abs(angleTo) / bot.turnRate;

			if (angleTo !== 0) {
				// TODO collision detection
				if(turnTime >= 1) {
					distanceTo = 0;
					angleTo = (angleTo / Math.abs(angleTo)) * bot.turnRate;
				}
				bot.heading += angleTo;
			}

			if (distanceTo !== 0) {
				//TODO move
				var moveTime = 1 - turnTime;
				if(distanceTo > bot.speed) {
					distanceTo = bot.speed;
				}
				distanceTo = moveTime * distanceTo;
				moveForward(distanceTo, bot);
			}
		}

		targetCoord = action.AimTowardsPosition
		if (targetCoord) {
			var angleTo = bot.angletoFace(targetCoord)
			if (angleTo !== 0) {
				// TODO turn cannon
			}
		}
		if (action.Fire) {
			if (bot.shotCooldown === 0) {
				fire(bot, gameState);
			}
		}
	}

	static changeHeading(degrees, bot, gameState) {
		//change heading according to the bots defined heading rate

	}

	static changeAim(degress, bot, gameState) {
		//change facing according to bots defined facing rate
	}

	static moveForward(int, bot) {
		//move forwards according to the bots defined movement rate

	}

	static moveBackward(int, bot, gameState) {
		//move backwards according to the bots defined movement rate
	}

	static fire(bot, gameState) {
		var bullet = new Projectile(bot.facing, 20, bot.position);
		gameState.P
		bot.shotCooldown = 10;
	}
}
