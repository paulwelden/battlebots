var assert = require('assert');
var should = require('should');
var bot = require('../bot');

describe('bot', function () {
	describe('#ctor()', function () {
		it('should create a bot when calling constructor', function () {
			var b = new bot('Mr Test', 'red', { x: 100, y: 250 }, function () { console.log('AI'); });
			should.exist(b);
			b.name.should.be.eql('Mr Test');
			b.color.should.be.eql('red');
			b.position.x.should.be.eql(100);
			b.position.y.should.be.eql(250);
			should.exist(b.ai);
		});
	});

	describe('#distainceTo(bot)', function () {
		it('should determine distance between bots', function () {
			var bot1 = new bot('bot1', 'red', { x: 100, y: 250 }, function () { });
			var bot2 = new bot('bot2', 'blue', { x: 200, y: 250 }, function () { });
			var distance = bot1.distanceTo(bot2);

			distance.should.be.eql(100);
		});
	});

	describe('#angleTo(bot)', function () {
		it('should determine angle between bots', function () {
			var bot1 = new bot('bot1', 'red', { x: 100, y: 200 }, function () { });
			var bot2 = new bot('bot2', 'blue', { x: 200, y: 100 }, function () { });
			var angle = bot1.angleTo(bot2);

			angle.should.be.eql(-45);
		});
	});
});