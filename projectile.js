'use strict';

module.exports = class projectile {
	constructor(heading, speed, position, owner) {
		this.heading = heading;
		this.speed = speed;
		this.position = position;
		this.owner = owner;
	}
}