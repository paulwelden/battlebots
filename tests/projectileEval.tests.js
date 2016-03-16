var assert = require('assert');
var should = require('should');
var gameState = require('../gameState');
var projectile = require('../projectile');
var projectileEval = require('../projectileEval');

describe('projectileEval', function () {
	describe('#eval()', function () {
		it('should execute the eval function', function () {
			var gs = new gameState();
			var p = new projectile(90, 25, { x: 100, y: 200 });
			projectileEval.eval(p, gs);
		});
	});
});