var assert = require('assert');
var should = require('should');
var engine = require('../gameEngine');

describe('gameEngine', function () {
	describe('#tick()', function () {
		it('should call the tick function', function () {
			var e = new engine();
			e.tick();
		});
	});
});