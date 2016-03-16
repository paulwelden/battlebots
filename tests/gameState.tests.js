var assert = require('assert');
var should = require('should');
var gameState = require('../gameState');

describe('gameState', function () {
	describe('#ctor()', function () {
		it('should create a blank gameState when calling constructor', function () {
			var gs = new gameState();
			should.exist(gs);
			should.exist(gs.activeBots);
			should.exist(gs.projectiles);
		});
	});

	describe('#createBot()', function () {
		it('should create a bot object when calling createBot', function () {
			var gs = new gameState();
			var myBot = gs.createBot('Mr Test', 'red', 'type', function () { console.log('AI'); })
			should.exist(myBot);
			myBot.position.x.should.be.above(0);
			myBot.position.x.should.be.below(800);
			myBot.position.y.should.be.above(0);
			myBot.position.y.should.be.below(800);
			myBot.name.should.be.eql('Mr Test');
			myBot.color.should.be.eql('red');
			should.exist(myBot.ai);
		});
	});
});