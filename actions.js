'use strict';
var coord = required('./coordinate');

module.exports = class actions {
	constructor() {
		this.fire = false;
		this.MoveTowardsPosition = null;
		this.AimTowardsPosition = null;
	}

	static MoveTowards(x, y) {
		var coordinates = new coord(x, y);
		this.MoveTowardsPosition = coordinates;
	}

	static AimTowards(x, y) {
		var coordinates = new coord(x, y);
		this.AimTowardsPosition = coordinates;
	}
}