'use strict';

module.exports = class collisionDetection {
	static eval(obj1, obj2) {
		// determine P1 bounds
		var obj1Max = Math.max(obj1.width, obj1.height) // * 1.42 //add back in once P2 is good
		var obj1P1 = {
			left: obj1.x - (obj1Max + obj1.width)*.5,
			top: obj1.y - (obj1Max + obj1.height)*.5
		};
		obj1P1.right = obj1P1.left + obj1Max;
		obj1P1.bottom = obj1P1.top + obj1Max;

		var obj2Max = Math.max(obj2.width, obj2.height) // * 1.42 //add back in once P2 is good
		var obj2P1 = {
			left: obj2.x - (obj2Max + obj2.width)*.5,
			top: obj2.y - (obj2Max + obj2.height)*.5
		};
		obj2P1.right = obj2P1.left + obj1Max;
		obj2P1.bottom = obj2P1.top + obj1Max;

		//test P1
		if (obj1P1.right < obj2P1.left)
			return false;

		if (obj1P1.bottom < obj2P1.top)
			return false;

		if (obj1P1.left > obj2P1.right)
			return false;

		if (obj1P1.top > obj2P1.bottom)
			return false;

		return true;
	}
}