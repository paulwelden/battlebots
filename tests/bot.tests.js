var assert = require('assert');
var should = require('should');
var bot = require('../bot');
var coordinate = require('../coordinate');

describe('bot', function () {
	describe('#ctor()', function () {
		it('should create a bot when calling constructor', function () {
			var b = new bot('Mr Test', 'red', new coordinate(100, 250), function () { console.log('AI'); });
			should.exist(b);
			b.name.should.be.eql('Mr Test');
			b.color.should.be.eql('red');
			b.position.x.should.be.eql(100);
			b.position.y.should.be.eql(250);
			should.exist(b.ai);
		});
	});

	describe('#distanceTo(coord)', function () {
		it('should determine distance to coordinates', function () {
			var bot1 = new bot('bot1', 'red', new coordinate(100,250), function () { });
			var distance = bot1.distanceTo(new coordinate(100,350));

			distance.should.be.eql(100);
		});
	});

	describe('#angleToFace(coord)', function () {
		it('should determine angle between current facing direction and coordinates passed', function () {
			var bot1 = new bot('bot1', 'red', new coordinate(100, 250), function () { });
			var angle = bot1.angleToFace(new coordinate(95,250));

			angle.should.be.eql(180);
		});
	});

	describe('#angleToMove(coord)', function () {
		it('should determine angle between current moving direction and coordinates passed', function () {
			var bot1 = new bot('bot1', 'red', new coordinate(100, 250), function () { });
			var angle = bot1.angleToMove(new coordinate(100,350));

			angle.should.be.eql(90);
		});
	});
});