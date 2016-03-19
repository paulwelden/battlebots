var assert = require('assert');
var should = require('should');
var cd = require('../collisionDetection');

describe('collisionDetection', function () {
	describe('#eval()', function () {
		it('should execute the eval function', function () {
			var obj1 = {
				x: 100,
				y: 100,
				height: 10,
				width: 10
			};
			var obj2 = {
				x: 200,
				y: 200,
				height: 10,
				width: 10
			};
			cd.eval(obj1, obj2).should.be.eql(false);
		});

		it('should detect colliding objects', function () {
			var obj1 = {
				x: 100,
				y: 100,
				height: 10,
				width: 10
			};
			var obj2 = {
				x: 110,
				y: 100,
				height: 10,
				width: 10
			};
			cd.eval(obj1, obj2).should.be.eql(true);
		})
	});
});