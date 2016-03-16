var assert = require('assert');
var should = require('should');
var actions = require('../actions');

describe('actions', function () {
	describe('#ctor()', function () {
		it('should execute the constructor', function () {
			var a = new actions();
		});
	});

	describe('#MoveTowards()', function () {
		it('should execute the MoveTowards function', function () {
			var a = new actions();
			a.moveTowards();
		});
	});

	describe('#AimTowards()', function () {
		it('should execute the AimTowards function', function () {
			var a = new actions();
			a.AimTowards();
		});
	});
});