'use strict';
var coordinate = require('./coordinate');
var constants = require('./constants');

module.exports = class bot {
	constructor(name, color, startingPosition, ai) {
		this.name = name;
0		this.color = color;
		this.position = startingPosition;
		this.ai = ai;
		this.health = 100;
		this.heading = 0;
		this.facing = 0;
		this.shotCooldown = 0;
		this.isHit = false;
		this.turnRate = 4;
		this.aimRate = 4;
		this.speed = 4;
		this.config = {};
	}

	distanceTo(coord) {
		if (!coord.hasOwnProperty("x")) {
			throw coord + " does not have property x";
		} else if (!coord.hasOwnProperty("y")) {
			throw coord + " does not have property y";
		}
		var dx = this.position.x - coord.x;
		var dy = this.position.y - coord.y;
		return Math.sqrt((dx * dx) + (dy * dy));
	}

	angleToFace(coord) {
		return this.angleTo(coord, this.facing);
	}

	angleToMove(coord) {
		return this.angleTo(coord, this.heading);
	}

	angleTo(coord, currentDirection) {
		if (!coord.hasOwnProperty("x")) {
			throw coord + " does not have property x";
		} else if (!coord.hasOwnProperty("y")) {
			throw coord + " does not have property y";
		}

		var dx = coord.x - this.position.x;
		var dy = coord.y - this.position.y;
		var targetAngle = constants.ConvertToDegreesFromRadians(Math.atan2(dy, dx));
		
		var targetAngle360 = this.convertAngleToBase360(targetAngle);
		var currentAngle360 = this.convertAngleToBase360(currentDirection);
		
		var rotatedTargetAngle360;
		if (currentAngle360 > 180) {
			rotatedTargetAngle360 = targetAngle360 + (360 - currentAngle360) % 360;
		} else {
			rotatedTargetAngle360 = targetAngle360 - currentAngle360;
		}

		return this.convertAngleToBase180(rotatedTargetAngle360)
	}

	convertAngleToBase360(angle) {
		return (360 + angle) % 360;
	}

	convertAngleToBase180(angle) {
		if (angle > 180) {
			return -(360 - angle);
		} else {
			return angle;
		}
	}
}
