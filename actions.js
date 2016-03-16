'use strict';
var coord = require('./Coordinate');

module.exports = class actions {
	constructor() {
		this.Fire = false;
		this.MoveTowardsPosition = null;
		this.AimTowardsPosition = null;
		this.MoveAmount = null;
		this.TurnAmount = null;
	}

	MoveTowards(x, y) {
		var coordinates = new coord(x, y);
		this.MoveTowardsPosition = coordinates;
	}

	AimTowards(x, y) {
		var coordinates = new coord(x, y);
		this.AimTowardsPosition = coordinates;
	}
}