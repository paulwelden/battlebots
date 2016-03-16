// JavaScript source code
"use strict";

class Bot {
	constructor(name, color, startingPosition, ai) {
		this.name = name;
		this.position = startingPosition;
		this.health = 10;
		this.heading = 0;
		this.facing = 0;
		this.color = color;
		this.shotCooldown = 0;
		this.isHit = false;
		this.hasShot = false;
		this.ai = ai;
	}
	distanceTo(bot) {
		if(!(bot instanceof Bot)) {
			throw "Not of type Bot";
		}
		var dx = this.position.x - Bot.position.x;
		var dy = this.position.y - Bot.position.y;
		var dist = Math.sqrt((dx * dx) + (dy * dy));
		return Math.abs(dist);
	}

	angleTo(bot) {
		if(!(bot instanceof Bot)) {
			throw "Not of type Bot";
		}
		var dx = this.position.x - Bot.position.x;
		var dy = this.position.y - Bot.position.y;
		var angleRadians = Math.atan2(dy, dx);
		var angleDiff = angleRadians - this.facing;
		return angleDiff;
	}
}
