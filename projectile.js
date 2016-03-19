'use strict';

module.exports = class projectile {
	constructor(heading, speed, position, owner, color) {
		this.heading = heading;
		this.speed = speed;
		this.position = position;
		this.ownerName = owner;
		this.color = color;
	}
}