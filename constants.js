'use strict';

module.exports = class constants {
	static BOT_SIZE() {
		return 31;
	}

	static WORLD_WIDTH() {
		return 800;
	}

	static WORLD_HEIGHT() {
		return 800;
	}

	static PROJECTILE_WIDTH() {
		return 5;
	}

	static PROJECTILE_HEIGHT() {
		return 9;
	}

	static ConvertToDegreesFromRadians(radians) {
		return radians * 180 / Math.PI;
	}

	static calculateNewPosition(distance, position, angle) {

	}
}
