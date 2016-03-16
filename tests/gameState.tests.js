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
			var bot = gs.createBot('Mr Test', 'red', 'type', function () { console.log('AI'); })
			should.exist(bot);
			bot.position.x.should.be.above(0);
			bot.position.x.should.be.below(800);
			bot.position.y.should.be.above(0);
			bot.position.y.should.be.below(800);
			bot.name.should.be.eql('Mr Test');
			bot.color.should.be.eql('red');
			should.exist(bot.ai);
		});
	});
});