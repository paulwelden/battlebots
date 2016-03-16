'use strict';
var coordinate = require('./coordinate');
var constants = require('./constants');

module.exports = class bot {
	constructor(name, color, startingPosition, ai) {
		this.name = name;
		this.position = startingPosition;
		this.health = 10;
		this.heading = 0;
		this.facing = 0;
		this.color = color;
		this.shotCooldown = 0;
		this.isHit = false;
		this.ai = ai;
		this.turnRate = 10;
		this.aimRate = 10;
		this.speed = 10;
	}

	distanceTo(coord) {
		if (!(coord instanceof coordinate)) {
			throw coord + " is not of type coordinate";
		}
		var dx = this.position.x - coord.x;
		var dy = this.position.y - coord.y;
		var dist = Math.sqrt((dx * dx) + (dy * dy));
		return Math.abs(dist);
	}

	angleToFace(coordinate) {
		var angle = this.angleTo(coordinate, this.facing);
		return angle;
	}

	angleToMove(coordinate) {
		var angle = this.angleTo(coordinate, this.heading);
		return angle;
	}

	angleTo(coord, currentDirection) {
		if (!(coord instanceof coordinate)) {
			throw coord + " is not of type coordinate";
		}

		var dx = coord.x - this.position.x ;
		var dy = coord.y - this.position.y ;
		var angleRadians = Math.atan2(dy, dx);
		var angleDiff = (  constants.ConvertToDegreesFromRadians( angleRadians) - currentDirection) % 360;
		return angleDiff;
	}
}
