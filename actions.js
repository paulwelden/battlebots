'use strict';
var coord = require('./coordinate');

module.exports = class actions {
	constructor() {
		this.Fire = false;
		this.MoveTowardsPosition = null;
		this.AimTowardsPosition = null;
		this.MoveAmount = null;
		this.TurnAmount = null;
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