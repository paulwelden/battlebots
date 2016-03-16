(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = class constants {
	static BOT_SIZE() {
		return 31;
	}

	static WORLD_WIDTH() {
		return 800;
	}

	static WORLD_HEIGHT() {
		return 800;
	}

	static PROJECTILE_WIDTH() {
		return 5;
	}

	static PROJECTILE_HEIGHT() {
		return 9;
	}

	static ConvertToDegreesFromRadians(radians) {
		return radians * 180 / Math.PI;
	}
}

},{}],2:[function(require,module,exports){
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
			success: function (data) {
				$("#userForm").hide();
			}
		});

		e.preventDefault(); // avoid to execute the actual submit of the form.
	});

	socket.on('scorebaord', function (data) {

	});

	socket.on('tick', function (data) {
		paintArena(data);
	});

	var botEffects = {};
	function paintArena(data) {
		paintBackground();
		for (var bot in data.activeBots) {
			paintBot(data.activeBots[bot]);
		}
		for (var projectile in data.projectiles) {
			paintProjectile(data.projectiles[projectile]);
		}
	}

	function paintProjectile(projectile) {
		ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.arc(projectile.x, projectile.y, 5, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();
	}

	function paintBot(bot) {
		ctx.save();

		// move/rotate the context to the tank's positioning
		ctx.translate(bot.position.x, bot.position.y);
		ctx.rotate(bot.heading * Math.PI / 180);

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

		// the middle circle of the cannon
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.arc(0, 0, 5, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();

		// the tank's gun
		ctx.rotate(bot.facing * Math.PI / 180);
		ctx.fillRect(0, -3, 35, 5);

		// the tank's laser aim
		if (botEffects[bot.name].shotEffectCountdown > 0) {
			ctx.fillStyle = "Red";
			ctx.fillRect(35, -2, 390, 3);
			botEffects[bot.name].shotEffectCountdown--;
		} else if (bot.shotCooldown === 0) {
			ctx.fillStyle = "#EE8181";
			for (var i = 0; i < 15; i++) {
				ctx.fillRect(50 + (i * 20), -2, 5, 3);
			}
		}

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
