(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	function constants() {
		_classCallCheck(this, constants);
	}

	_createClass(constants, null, [{
		key: 'BOT_SIZE',
		value: function BOT_SIZE() {
			return 31;
		}
	}, {
		key: 'WORLD_WIDTH',
		value: function WORLD_WIDTH() {
			return 800;
		}
	}, {
		key: 'WORLD_HEIGHT',
		value: function WORLD_HEIGHT() {
			return 800;
		}
	}, {
		key: 'PROJECTILE_WIDTH',
		value: function PROJECTILE_WIDTH() {
			return 5;
		}
	}, {
		key: 'PROJECTILE_HEIGHT',
		value: function PROJECTILE_HEIGHT() {
			return 9;
		}
	}, {
		key: 'ConvertToDegreesFromRadians',
		value: function ConvertToDegreesFromRadians(radians) {
			return radians * 180 / Math.PI;
		}
	}, {
		key: 'ConvertToRadiansFromDegrees',
		value: function ConvertToRadiansFromDegrees(degrees) {
			return degrees * Math.PI / 180;
		}
	}, {
		key: 'calculateNewPosition',
		value: function calculateNewPosition(distance, position, angle) {}
	}]);

	return constants;
}();

},{}],2:[function(require,module,exports){
"use strict";

var constants = require('../constants');

$(document).ready(function () {
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var socket = io.connect();

	$("#userForm").submit(function (e) {
		$.ajax({
			type: "POST",
			url: "/",
			data: $("#userForm").serialize(), // serializes the form's elements.
			success: function success(data) {
				$("#addNewBot").hide();
			}
		});

		e.preventDefault(); // avoid to execute the actual submit of the form.
	});

	socket.on('scorebaord', function (data) {});

	socket.on('tick', function (data) {
		paintArena(data);
	});

	var botEffects = {};
	function paintArena(data) {
		paintBackground();
		for (var bot in data.activeBots) {
			paintBot(data.activeBots[bot]);
		}
		for (var i = 0; i < data.projectiles.length; i++) {
			paintProjectile(data.projectiles[i]);
		}
	}

	function paintProjectile(projectile) {
		ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.arc(projectile.position.x, projectile.position.y, 5, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();
	}

	function paintBot(bot) {
		// translate hit/shot events into client-side counters
		if (botEffects[bot.name] === undefined) {
			botEffects[bot.name] = {
				hitEffectCountdown: 0,
				shotEffectCountdown: 0
			};
		}
		if (bot.isHit) {
			botEffects[bot.name].hitEffectCountdown = 25;
		}
		if (bot.hasShot) {
			botEffects[bot.name].shotEffectCountdown = 2;
		}

		ctx.save();

		// move/rotate the context to the tank's positioning
		ctx.translate(bot.position.x, bot.position.y);
		ctx.rotate(bot.heading * Math.PI / 180);

		if (botEffects[bot.name].hitEffectCountdown > 0) {
			if (botEffects[bot.name].hitEffectCountdown % 2 === 0) {
				ctx.fillStyle = "Red";
				ctx.fillRect(-18, -18, 35, 39);
			}
			botEffects[bot.name].hitEffectCountdown--;
		}

		// the tank body
		ctx.fillStyle = bot.color;
		ctx.fillRect(-16, -16, 31, 31);

		// the tank tires
		ctx.fillStyle = "black";
		ctx.fillRect(-16, -16, 31, 3);
		ctx.fillRect(-16, 15, 31, 3);

		ctx.restore();
		ctx.save();

		ctx.translate(bot.position.x, bot.position.y);
		ctx.rotate(bot.facing * Math.PI / 180);

		// the middle circle of the cannon
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.arc(0, 0, 5, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();

		// the tank's gun
		ctx.fillRect(0, -3, 35, 5);
		ctx.restore();
	}

	function paintBackground() {
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, 800, 800);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, 800, 800);
	}
});

},{"../constants":1}]},{},[2]);
