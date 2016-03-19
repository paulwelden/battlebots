var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var path = require('path');
var gamestate = require('./gameState');
var actionEval = require('./actionEval');
var projectileEval = require('./projectileEval');
var gameEngine = require('./gameEngine');

// global variables
var game = new gamestate();
var clients = {};

// Configure the web server portion of the node application
http.listen(process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

// client socket communications
io.on('connection', function (socket) {
	clients[socket.id] = socket;
	socket.on('disconnect', function() {
		clients[socket.id] = null;
	});
	socket.on('newbot', function (data, callback) {
		if (data.name.trim().length === 0) {
			callback(false, "Name cannot be empty or whitespace.");
		} else if (game.activeBots[data.name] !== undefined) {
			callback(false, "Name is already in use.");
		} else {
			var botAI;
			try {
				botAI = new Function("me", "game", "moves", data.script);
				game.activeBots[data.name] = game.createBot(data.name, data.color, botAI);
				callback(true, "");
			} catch (err) {
				callback(false, "Invalid AI: " + err.message);
			}
		}
	});
	socket.on('message', function (message) {
		emitMessage(message);
	});
	socket.on('reset', function () {
		game = new gamestate();
	});
	socket.on('pause', function () {
		game.active = false;
	});
	socket.on('resume', function () {
		game.active = true;
	});
});

// send a chat message to each client
function emitMessage(message) {
	for (var c in clients) {
		if (clients[c] !== null) {
			clients[c].emit('chat', message);
		}
	}
}

// game engine ticket and emit results to all clients
function gameEngineTick() {
	if (game.active === true) {
		gameEngine.tick(game);
	}
	for (var c in clients) {
		if (clients[c] !== null)
			clients[c].emit('tick', game);
	}
}
setInterval(gameEngineTick, 50);