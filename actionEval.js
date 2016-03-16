'use strict';
var actions = require('./actions');
var bot = require('./bot');
var gameState = require('./gameState');
var projectile = require('./projectile');
var constants = require('./constants');
var collisions = require('./collisionDetection');
var deepcopy = require('deepcopy');

module.exports = class actionEval {

	static eval(action, botToEval, gState) {
		if (!(action instanceof actions)) {
			throw "action is garbage";
		}
		if (!(botToEval instanceof bot)) {
			throw "botToEval is garbage";
		}
		if (!(gState instanceof gameState)) {
			throw "gState is garbage";
		}
		var targetCoord = action.MoveTowardsPosition;
		if (targetCoord) {
			//TODO need to do hit detection bot -> bot
			if (targetCoord.x < 0) {
				targetCoord.x = 0;
			}
			if (targetCoord.x > constants.WORLD_WIDTH()) {
				targetCoord.x = constants.WORLD_WIDTH();
			}
			if (targetCoord.y < 0) {
				targetCoord.y = 0;
			}
			if (targetCoord.y > constants.WORLD_HEIGHT()) {
				targetCoord.y = constants.WORLD_HEIGHT();
			}

			var angleTo = botToEval.angleToMove(targetCoord);

			var distanceTo = botToEval.distanceTo(targetCoord);
			var turnTime = Math.abs(angleTo) / botToEval.turnRate;
			if ((angleTo >= 1 ||  angleTo <= -1) && distanceTo > 1 ) {
				// TODO collision detection
				if(turnTime >= 1) {
					distanceTo = 0;
					angleTo = (angleTo / Math.abs(angleTo)) * botToEval.turnRate;
				}
				botToEval.heading += angleTo;
				botToEval.heading %= 360;
			}
			if (distanceTo !== 0) {
				var moveTime = 1 - turnTime;
				if(distanceTo > botToEval.speed) {
					distanceTo = botToEval.speed;
				}
				distanceTo = moveTime * distanceTo;
				actionEval.moveForward(distanceTo, botToEval);
			}
		}

		targetCoord = action.AimTowardsPosition
		if (targetCoord) {
			var angleTo = botToEval.angletoFace(targetCoord)
			if (angleTo !== 0) {
				botToEval.facing += angleTo > 0 ? Math.min(botToEval.aimRate, angleTo) : Math.max(-botToEval.aimRate, angleTo);
			}
		}

		if (action.Fire) {
			if (botToEval.shotCooldown === 0) {
				actionEval.fire(botToEval, gState);
			}
		}
	}

	static moveForward(distanceTo, botToMoveForward) {
		//move forwards according to the bots defined movement rate
		var radiansFromDegree = constants.ConvertToRadiansFromDegrees(botToMoveForward.heading);
		botToMoveForward.position.x += distanceTo * Math.cos(radiansFromDegree);
		botToMoveForward.position.y += distanceTo * Math.sin(radiansFromDegree);
	}

    static fire(botToFire, gState) {
        //var positionCopy = deepcopy(botToFire.position);
        var positionCopy = JSON.parse(JSON.stringify(botToFire.position));
        var bullet = new projectile(botToFire.facing, 20, positionCopy);
		gState.projectiles.push(bullet);
		botToFire.shotCooldown = 10;
	}
}
