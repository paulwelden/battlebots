$(document).ready(function () {
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");

	var socket = io.connect();

	socket.on('tick', function (data) {
		paintArena(data);
	});

	function paintArena(data) {
		var data = {
			bots: [
				{
					coordinates: {
						x: 300,
						y: 250
					},
					heading: 90,
					aiming: 180,
					color: 'red'
				},
				{
					coordinates: {
						x: 120,
						y: 600
					},
					heading: 75,
					aiming: 45,
					color: 'blue'
				},
				{
					coordinates: {
						x: 400,
						y: 400
					},
					heading: 0,
					aiming: 0,
					color: 'green'
				},
			]
		};


		paintBackground();
		for (var bot in data.bots) {
			paintBot(data.bots[bot]);
		}
	}
	
	function paintBot(bot) {
		ctx.save();
		ctx.translate(bot.coordinates.x, bot.coordinates.y);
		ctx.rotate(bot.heading * Math.PI / 180);

		ctx.fillStyle = bot.color;
		ctx.fillRect(-16, -16, 31, 31);

		ctx.fillStyle = "black";
		ctx.fillRect(-16, -16, 31, 3);
		ctx.fillRect(-16, 15, 31, 3);

		ctx.rotate(bot.aiming * Math.PI / 180);
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