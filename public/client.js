$(document).ready(function () {
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");

	var socket = io.connect();

	socket.on("test", function (data) {
		ctx.fillText(data, 10, 10);
	});
});