var constants = require('../constants');

$(document).ready(function () {
	var resetBtn = $("#resetBtn")[0];
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var socket = io.connect();

	$("#resetBtn").click(function (e) {
		socket.emit('reset');
	});

	$("#userForm").submit(function (e) {
		$.ajax({
			type: "POST",
			url: "/",
			data: $("#userForm").serialize(), // serializes the form's elements.
			success: function(data)
			{
				$("#addNewBot").hide();
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
		for (var i = 0; i < data.projectiles.length; i++) {
			paintProjectile(data.projectiles[i], data.activeBots[data.projectiles[i].ownerName].color);
		}
		for (var bot in data.activeBots) {
			paintBot(data.activeBots[bot]);
		}
	}

	function paintProjectile(projectile, color) {
		ctx.fillStyle = color;
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
