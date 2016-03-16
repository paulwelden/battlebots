'use strict';
var actions = require('./actions');
var bot = require('./bot');
var gameState = require('./gameState');

var Action = require('./actions');
var Bot = require('./bot');
var GameState = require('./gameState');
var Projectile = require('./Projectile');

module.exports = class actionEval {

	static eval(action, botToEval, gameState) {
		if (!(action instanceof actions)) {
			throw "action is garbage";
		}
		if (!(botToEval instanceof bot)) {
			throw "botToEval is garbage";
		}
		if (!(gameState instanceof gameState)) {
			throw "gameState is garbage";
		}
		var targetCoord = action.MoveTowardsPosition;
		if (targetCoord) {
		    //TODO need to do hit detection bot -> bot and bot -> wall
			var angleTo = botToEval.angleToMove(targetCoord);
			var distanceTo = botToEval.distanceTo(targetCoord);
			var turnTime = Math.abs(angleTo) / botToEval.turnRate;

			if (angleTo !== 0) {
				// TODO collision detection
				if(turnTime >= 1) {
					distanceTo = 0;
					angleTo = (angleTo / Math.abs(angleTo)) * botToEval.turnRate;
				}
				botToEval.heading += angleTo;
			}

			if (distanceTo !== 0) {
				//TODO move
				var moveTime = 1 - turnTime;
				if(distanceTo > botToEval.speed) {
					distanceTo = botToEval.speed;
				}
				distanceTo = moveTime * distanceTo;
				moveForward(distanceTo, botToEval);
			}
		}

		targetCoord = action.AimTowardsPosition
		if (targetCoord) {
			var angleTo = botToEval.angletoFace(targetCoord)
			if (angleTo !== 0) {
				// TODO turn cannon
			}
		}
		if (action.Fire) {
			if (botToEval.shotCooldown === 0) {
				fire(botToEval, gameState);
			}
		}
	}

	static changeHeading(degrees, botToChangeHeading, gameState) {
		//change heading according to the bots defined heading rate

	}

	static changeAim(degress, botToChangeAim, gameState) {
		//change facing according to bots defined facing rate
	}

	static moveForward(int, botToMoveForward) {
		//move forwards according to the bots defined movement rate

	}

	static moveBackward(int, botToMoveBackward, gameState) {
		//move backwards according to the bots defined movement rate
	}

	static fire(botToFire, gameState) {
		var bullet = new Projectile(bot.facing, 20, bot.position);
		gameState.P
		bot.shotCooldown = 10;
	}
}
