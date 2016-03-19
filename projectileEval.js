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
		if(projectileToEval.position.x > constants.WORLD_WIDTH() + constants.BOT_SIZE() || projectileToEval.position.x < 0 - constants.BOT_SIZE()){
			return true;
		}
		if(projectileToEval.position.y > constants.WORLD_HEIGHT() + constants.BOT_SIZE() || projectileToEval.position.y < 0 - constants.BOT_SIZE()){
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
			if (botToEval.name === projectileToEval.ownerName)
				continue;
			
			var botObj = {
				width : constants.BOT_SIZE(),
				height : constants.BOT_SIZE(),
				x : botToEval.position.x,
				y : botToEval.position.y

			};

			if (projectileEval.evalCollision(projectileObj, botObj)) {
				botToEval.health = botToEval.health - 5;
				botToEval.isHit = true;
				return true;
			}
		}
		return false;
	}

	static evalCollision(obj1, obj2) {
        if(obj1.x - obj1.width/2 < obj2.x + obj2.width/2 && 
            obj1.x + obj1.width/2 > obj2.x - obj2.width/2 &&
            obj1.y - obj1.height/2 < obj2.y + obj2.height/2 &&
            obj1.y + obj1.height/2 > obj2.y - obj2.height/2)
        {
            return true;
        }
        return false;
	}
}
