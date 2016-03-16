var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var path = require('path');
var gamestate = require('./gameState');

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
	var checkBot = game.activeBots[botName];
	if (!checkBot)
		game.activeBots[botName] = newBot;

	console.log(game.activeBots[botName]);
	console.log(game.activeBots);
	io.emit('scoreboard', game.activeBots);
	res.send('received');
	//event loop
	//res.sendFile(__dirname + "/upload.html");
});

var game = new gamestate();

var clients = {};
io.on('connection', function (socket) {
	clients[socket.id] = socket;
	//socket.on('newbot', function (data) {
	//	game.bots.push(data);
	//});
});

function gameEngineTick() {
	for (var bot in game.bots) {
		eval(bot.ai);
	}

	for (var c in clients) {
		clients[c].emit('tick', game);
	}
}
setInterval(gameEngineTick, 50);
