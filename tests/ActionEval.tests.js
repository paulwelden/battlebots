var assert = require('assert');
var should = require('should');
var ActionEval = require('../ActionEval');
var actions = require('../actions');
var gameState = require('../gameState');

describe('ActionEval', function () {
	describe('#eval()', function () {
		it('should execute the eval function', function () {
			var ae = new ActionEval();
			var action = new actions();
			var bot = new bot();
			var gs = new gameState();

			ae.eval(action, bot, gs);
		});
	});

	describe('#needsToChangeHeading()', function () {
		it('should execute the needsToChangeHeading function', function () {
			var ae = new ActionEval();
			ae.needsToChangeHeading();
		});
	});

	describe('#changeHeading()', function () {
		it('should execute the changeHeading function', function () {
			var ae = new ActionEval();
			ae.changeHeading();
		});
	});

	describe('#changeAim()', function () {
		it('should execute the changeAim function', function () {
			var ae = new ActionEval();
			ae.changeAim();
		});
	});

	describe('#moveForward()', function () {
		it('should execute the moveForward function', function () {
			var ae = new ActionEval();
			ae.moveForward();
		});
	});

	describe('#moveBackward()', function () {
		it('should execute the moveBackward function', function () {
			var ae = new ActionEval();
			ae.moveBackward();
		});
	});

	describe('#fire()', function () {
		it('should execute the fire function', function () {
			var ae = new ActionEval();
			ae.fire();
		});
	});
});