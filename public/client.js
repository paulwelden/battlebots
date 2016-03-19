var constants = require('../constants');

$(document).ready(function () {
	var socket = io.connect();

	// Admin functions
	$("#resetBtn").click(function () {
		socket.emit('reset');
	});
	$("#pauseBtn").click(function () {
		socket.emit('pause');
	});
	$("#resumeBtn").click(function () {
		socket.emit('resume');
	});

	// Chat events
	$('#chatForm').submit(function (e) {
		var message = $('#chatInput')[0].value;
		if (message.length > 0) {
			socket.emit('message', message);
			$('#chatInput')[0].value = '';
			}
		e.preventDefault();
	});

	socket.on('chat', function (message) {
		$('#messages').append($('<li>').text(message));
		$('#messages')[0].scrollTop = $('#messages')[0].scrollHeight;
	});

	// New Bot events
	$("#userForm").submit(function (e) {
		$("#newboterror")[0].innerText = "";
		var newBot = {
			name: $("#name")[0].value,
			color: $("#color")[0].value,
			script: $("#script")[0].value
		};
		socket.emit('newbot', newBot, newBotResult);
		e.preventDefault(); // avoid to execute the actual submit of the form.
	});

	function newBotResult(success, message) {
		if (success === false) {
			$("#newboterror")[0].innerText = message;
		}
	}

	socket.on('tick', function (data) {
		for (var b in botEffects) {
			if (data.activeBots[b] === undefined) {
				delete botEffects[b];
			}
		}
		paintArena(data);
		paintScoreboard(data);
	});

	function paintScoreboard(data) {
		var ctx = $("#scoreboardCanvas")[0].getContext("2d");
		clearScoreboard(ctx);
		paintScoreboardHeader(ctx);
		var botRow = 0;
		for (var b in data.activeBots) {
			var bot = data.activeBots[b];
			ctx.fillStyle = bot.color;
			ctx.fillRect(5, botRow * 25 + 40, 10, 10);
			ctx.strokeStyle = 'black';
			ctx.strokeRect(5, botRow * 25 + 40, 10, 10);

			ctx.fillStyle = 'black';
			ctx.font = '12px Arial';
			ctx.textBaseline = 'middle';
			ctx.textAlign = 'left';
			ctx.fillText(bot.name, 25, botRow * 25 + 45, 120);
			ctx.fillText(bot.position.x.toFixed(2) + "," + bot.position.y.toFixed(2), 150, botRow * 25 + 45, 90);
			ctx.fillText(bot.heading.toFixed(2), 250, botRow * 25 + 45, 90);
			ctx.fillText(bot.facing.toFixed(2), 350, botRow * 25 + 45, 90);
			ctx.fillText(bot.health, 450, botRow * 25 + 45, 90);
			botRow++;
		}
	}

	function paintScoreboardHeader(ctx) {
		ctx.fillStyle = "black";
		ctx.font = "bold 14px Arial";
		ctx.textBaseline = "alphabetic";
		ctx.textAlign = "left";
		ctx.fillText("Name", 25, 25);
		ctx.fillText("Position", 150, 25);
		ctx.fillText("Heading", 250, 25);
		ctx.fillText("Facing", 350, 25);
		ctx.fillText("Health", 450, 25);
	}

	function clearScoreboard(ctx) {
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, 800, 800);
	}

	var botEffects = {};
	function paintArena(data) {
		var ctx = $("#canvas")[0].getContext("2d");
		paintBackground(ctx);
		for (var i = 0; i < data.projectiles.length; i++) {
			paintProjectile(ctx, data.projectiles[i]);
		}
		for (var bot in data.activeBots) {
			paintBot(ctx, data.activeBots[bot]);
		}
	}

	function paintProjectile(ctx, projectile) {
		ctx.fillStyle = projectile.color;
		ctx.beginPath();
		ctx.arc(projectile.position.x, projectile.position.y, 5, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();
	}

	function paintBot(ctx, bot) {
		// translate hit events into client-side counters
		if (botEffects[bot.name] === undefined) {
			botEffects[bot.name] = {
				hitEffectCountdown: 0
			};
		}
		if (bot.isHit === true) {
			botEffects[bot.name].hitEffectCountdown = 25;
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

	function paintBackground(ctx) {
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, 800, 800);
	}
});
