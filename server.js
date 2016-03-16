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
var paulBot = require('./paulsReallySadBot.js');

http.listen(3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
	var botAI = new Function('game', 'moves', req.body.script);
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
game.activeBots['paul'] = game.createBot('paul', '#0000FF', '', paulBot);

var clients = {};
io.on('connection', function (socket) {
	clients[socket.id] = socket;
});

function gameEngineTick() {
    gameEngine.tick(game);

	for (var c in clients) {
		clients[c].emit('tick', game);
	}
}
setInterval(gameEngineTick, 500);

function haveHit(obj1, obj2)
{
  //P1
  //determine P1 bounds
  var obj1Max = Math.max(obj1.width, obj1.height) // * 1.42 //add back in once P2 is good
  var obj1P1 = {
    left: obj1.x - (obj1Max + obj1.width)*.5,
    top: obj1.y - (obj1Max + obj1.height)*.5
    };
  obj1P1.right = obj1P1.left + obj1Max;
  obj1P1.bottom = obj1P1.top + obj1Max;

  var obj2Max = Math.max(obj2.width, obj2.height) // * 1.42 //add back in once P2 is good
  var obj2P1 = {
    left: obj2.x - (obj2Max + obj2.width)*.5,
    top: obj2.y - (obj2Max + obj2.height)*.5
  };
  obj2P1.right = obj2P1.left + obj1Max;
  obj2P1.bottom = obj2P1.top + obj1Max;

  //test P1
  if (obj1P1.right < obj2P1.left)
    return false;
  if (obj1P1.bottom < obj2P1.top)
    return false;
  if (obj1P1.left > obj2P1.right)
    return false;
  if (obj1P1.top > obj2P1.bottom)
    return false;

  //P2
  //draw obj1 & obj2
  //save pixel data
  //draw obj2
  //compare pixels

  return true;
}
