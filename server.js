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

http.listen(process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
	var botAI = new Function('me', 'game', 'moves', req.body.script);
	var botColor = req.body.color;
	var botName = req.body.userName;
	var botType = req.body.type;

	if (game.activeBots[botName] === undefined) {
		game.activeBots[botName] = game.createBot(botName, botColor, botType, botAI);
	}
	io.emit('scoreboard', game.activeBots);
	res.send('received');
});

var game = new gamestate();

var clients = {};
io.on('connection', function(socket) {
	clients[socket.id] = socket;
});

function gameEngineTick() {
	gameEngine.tick(game);

	for (var c in clients) {
		clients[c].emit('tick', game);
	}
}

setInterval(gameEngineTick, 50);
