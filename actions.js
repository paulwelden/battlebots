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
	    console.log("move to " + x + " and " + y);
		var coordinates = new coord(x, y);
		this.MoveTowardsPosition = coordinates;
	}

	AimTowards(x, y) {
		var coordinates = new coord(x, y);
		this.AimTowardsPosition = coordinates;
	}
}