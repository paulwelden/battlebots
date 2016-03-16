var assert = require('assert');
var should = require('should');
var actionEval = require('../actionEval');
var actions = require('../actions');
var gameState = require('../gameState');
var bot = require('../bot');

describe('actionEvalTests', function () {
	describe('#eval()', function () {
		it('should execute the eval function', function () {
			var action = new actions();
			var myBot = new bot();
			var gs = new gameState();

			actionEval.eval(action, myBot, gs);
		});
	});

	describe('#changeHeading()', function () {
		it('should execute the changeHeading function', function () {
			actionEval.changeHeading();
		});
	});

	describe('#changeAim()', function () {
		it('should execute the changeAim function', function () {
			actionEval.changeAim();
		});
	});

	describe('#moveForward()', function () {
		it('should execute the moveForward function', function () {
			var gs = new gameState();
			var myBot = gs.createBot('Mr Test', 'red', 'type', function () { console.log('AI'); })
			actionEval.moveForward(10, myBot);
		});
	});

	describe('#moveBackward()', function () {
		it('should execute the moveBackward function', function () {
			actionEval.moveBackward();
		});
	});

	describe('#fire()', function () {
		it('should execute the fire function', function () {
			actionEval.fire();
		});
	});
});