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


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  //event loop
  //loop through custom bot scripts
  console.log(req.body);
  var botAI = new Function('Game', req.body.botAI);
  //botAI();
res.send('POST request to the homepage');
  //event loop
  //res.sendFile(__dirname + "/upload.html");
});

var game = new gamestate();

var clients = {};
io.on('connection', function (socket) {
	clients[socket.id] = socket;
	socket.on('newbot', function (data) {
		game.bots.push(data);
	});
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
