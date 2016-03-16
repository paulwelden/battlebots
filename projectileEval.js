'use strict';

var actionEval = require('./actionEval');
var projectile = require('./projectile');
var collisionDetection = require('./collisionDetection');
var gameState = require('./gameState');
var constants = require('./constants');
var bot = require('./bot');

module.exports = class projectileEval {

	static eval(projectileToEval, gameStateToEval) {
		actionEval.moveForward(projectileToEval.speed, projectileToEval);

		//If it is off the map record it as a collision
		if(projectileToEval.position.x > constants.WORLD_WIDTH() || projectileToEval.position.x < 0){
			return true;
		}
		if(projectileToEval.position.y > constants.WORLD_HEIGHT() || projectileToEval.position.y < 0){
			return true;
		}

		var projectileObj = {
			width: 1,
			height: 1,
			x: projectileToEval.position.x,
			y: projectileToEval.position.y
		};

		for (var botKey in gameStateToEval.activeBots) {
			var botToEval = gameStateToEval.activeBots[botKey];

			var botObj = {
				width : constants.BOT_SIZE(),
				height : constants.BOT_SIZE(),
				x : botToEval.position.x,
				y : botToEval.position.y

			};

			if (collisionDetection.eval(projectileObj, botObj)) {
				botToEval.health = botToEval.health - 6;
				botToEval.isHit = true;
				return true;
			}
		}
		return false;
	}
}
