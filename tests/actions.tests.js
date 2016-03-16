var assert = require('assert');
var should = require('should');
var actions = require('../actions');

describe('actions', function () {
	describe('#ctor()', function () {
		it('should execute the constructor', function () {
			var a = new actions();
			should.exist(a);
		});
	});

	describe('#MoveTowards()', function () {
		it('should execute the MoveTowards function', function () {
			var a = new actions();
			a.MoveTowards(100, 250);

			a.MoveTowardsPosition.x.should.be.eql(100);
			a.MoveTowardsPosition.y.should.be.eql(250);
		});
	});

	describe('#AimTowards()', function () {
		it('should execute the AimTowards function', function () {
			var a = new actions();
			a.AimTowards(500, 600);

			a.AimTowardsPosition.x.should.be.eql(500);
			a.AimTowardsPosition.y.should.be.eql(600);
		});
	});
});