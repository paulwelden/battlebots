var assert = require('assert');
var should = require('should');
var projectileEval = require('../projectileEval');

describe('projectileEval', function () {
	describe('#eval()', function () {
		it('should execute the eval function', function () {
			var pe = new projectileEval();
			pe.eval();
		});
	});
});