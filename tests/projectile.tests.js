var assert = require('assert');
var should = require('should');
var projectile = require('../projectile');

describe('projectile', function () {
	describe('#ctor()', function () {
		it('should execute the constructor', function () {
			var p = new projectile(90, 25, { x: 100, y: 200 });
			should.exist(p);
			p.heading.should.be.eql(90);
			p.speed.should.be.eql(25);
			p.position.x.should.be.eql(100);
			p.position.y.should.be.eql(200);
		});
	});
});