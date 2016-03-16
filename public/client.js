$(document).ready(function () {
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");

	var socket = io.connect();

	socket.on('tick', function (data) {
		paintArena(data);
	});

	var botEffects = {};

	var timer = 0;
	function paintArena(data) {
		var data = {
			bots: [
				{
					name: "Frank",
					color: "red",
					health: 100,
					position: {
						x: 300,
						y: 250 + (timer * 5)
					},
					heading: 90,
					facing: 180,
					shotCooldown: timer > 10 && timer < 50 ? 1 : 0,
					isHit: false,
					hasShot: false
				},
				{
					name: "Steve",
					color: "blue",
					health: 80,
					position: {
						x: 120,
						y: 600
					},
					heading: 75 + (timer * 10),
					facing: 45,
					shotCooldown: 0,
					isHit: timer === 10 ? true : false,
					hasShot: false
				},
				{
					name: "Billy Bob",
					color: "green",
					health: 30,
					position: {
						x: 400,
						y: 400
					},
					heading: 0,
					facing: timer * 10,
					shotCooldown: 0,
					isHit: timer === 70 ? true : false,
					hasShot: timer === 50 ? true : false
				}
			]
		};
		timer++;
		if (timer > 100) timer = 0;

		paintBackground();
		for (var bot in data.bots) {
			paintBot(data.bots[bot]);
		}
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