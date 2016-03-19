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

	MoveTowards(x, y) {
		this.MoveTowardsPosition = new coord(x, y);
	}

	AimTowards(x, y) {
		this.AimTowardsPosition = new coord(x, y);
	}
}