$(document).ready(function () {
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");

	var socket = io.connect();

	socket.on('tick', function (data) {
		paintArena(data);
	});

	var timer = 0;
	function paintArena(data) {
		var data = {
			bots: [
				{
					position: {
						x: 300,
						y: 250 + (timer * 5)
					},
					heading: 90,
					aiming: 180,
					color: 'red'
				},
				{
					position: {
						x: 120,
						y: 600
					},
					heading: 75 + (timer * 10),
					aiming: 45,
					color: 'blue'
				},
				{
					position: {
						x: 400,
						y: 400
					},
					heading: 0,
					aiming: timer * 10,
					color: 'green'
				},
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
		ctx.translate(bot.position.x, bot.position.y);
		ctx.rotate(bot.heading * Math.PI / 180);

		ctx.fillStyle = bot.color;
		ctx.fillRect(-16, -16, 31, 31);

		ctx.fillStyle = "black";
		ctx.fillRect(-16, -16, 31, 3);
		ctx.fillRect(-16, 15, 31, 3);

		ctx.rotate(bot.aiming * Math.PI / 180);
		ctx.fillRect(0, -3, 35, 5);
		ctx.beginPath();
		ctx.arc(0, 0, 5, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();

		ctx.restore();
	}
	
	function paintBackground() {
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, 800, 800);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, 800, 800);
	}
});