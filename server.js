var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

http.listen(3000);
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

var game = new GameState();

var clients = {};
io.on('connection', function (socket) {
	clients[socket.id] = socket;
	socket.on('newbot', function (data) {
		arena.bots.push(data);
	});
});

function gameEngineTick() {
	for (var bot in arena.bots) {
		eval(bot.ai);
	}

	for (var c in clients) {
		clients[c].emit('tick', arena);
	}
}
setInterval(gameEngineTick, 50);