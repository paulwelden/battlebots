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
			//console.log(projectileObj);
			

			var botObj = {
				width : constants.BOT_SIZE(),
				height : constants.BOT_SIZE(),
				x : botToEval.position.x,
				y : botToEval.position.y

			};

			if (projectileEval.evalCollision(projectileObj, botObj)) {
			    console.log('collision');
			    console.log(projectileObj);
			    console.log(botObj);
				botToEval.health = botToEval.health - 6;
				botToEval.isHit = true;
				return true;
			}
		}
		return false;
	}

    static evalCollision(obj1, obj2){
        if(obj1.x < obj2.x + obj2.width && 
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y)
        {
            return true;
        }
        return false;
	}
}
