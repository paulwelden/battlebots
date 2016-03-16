var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var path = require('path');
var gamestate = require('./gameState');
var actionEval = require('./actionEval');
var projectileEval = require('./projectileEval');

http.listen(3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
	var botAI = new Function('Game', req.body.script);
	var botColor = req.body.color;
	var botName = req.body.userName;
	var botType = req.body.type;

	var newBot = game.createBot(botName, botColor, botType, botAI);
	if (game.activeBots[botName] === undefined) {
		game.activeBots[botName] = newBot;
	}
});

var game = new gamestate();

var clients = {};
io.on('connection', function (socket) {
	clients[socket.id] = socket;
});

function gameEngineTick() {
	var actionsToDo = [];

	for (var bot in game.bots) {
		var action = new actions();
		bot.ai(game, action);
		actionsToDo[bot.botName] = action;
		console.log(action);
	}

	//do projectile moves
	for (var projectile in game.projectiles) {
		projectileEval.eval(projectile, game);
	}

	for (var action in actionsToDo) {
		actionEval.eval(action, game.activeBots[botName], game);
		console.log("evaluated action");
	}

	for (var c in clients) {
		clients[c].emit('tick', game);
	}
}
setInterval(gameEngineTick, 50);
