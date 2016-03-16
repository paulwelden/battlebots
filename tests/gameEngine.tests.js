var assert = require('assert');
var should = require('should');
var engine = require('../gameEngine');
var gameState = require('../gameState');

describe('gameEngine', function () {
	describe('#tick()', function () {
		it('should call the tick function', function () {
			var gState = new gameState();
			engine.tick(gState);
		});
	});
});