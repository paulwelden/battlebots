var assert = require('assert');
var should = require('should');
var actionEval = require('../actionEval');
var actions = require('../actions');
var gameState = require('../gameState');
var bot = require('../bot');
var coord = require('../coordinate');

describe('actionEvalTests', function () {
	describe('#eval()', function () {
		it('should execute the eval function', function () {
			var action = new actions();
			var myBot = new bot('test', 'color', new coord(100, 100), function () {});
			var gs = new gameState();

			actionEval.eval(action, myBot, gs);
		});
	});

	describe('#moveForward()', function () {
		it('should execute the moveForward function', function () {
			var gs = new gameState();
			var myBot = gs.createBot('Mr Test', 'red', 'type', function () { console.log('AI'); })
			actionEval.moveForward(10, myBot);
		});
	});

	describe('#fire(botToFire, gState)', function () {
		it('should execute the fire function', function () {
			var gs = new gameState();
			var myBot = gs.createBot('Mr Test', 'red', 'type', function () { console.log('AI'); })

			actionEval.fire(myBot, gs);
		});
	});
});