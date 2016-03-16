var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var path = require('path');

http.listen(3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/upload", function(req, res) {
  res.sendFile(__dirname + "/upload.html");
});

app.post("/upload", function(req, res, next) {
  console.log(req.body.botLogic);
  //event loop
  //loop through custom bot scripts
  var result = new Function('Game', req.body.botLogic);
  result(gameObject);
  //event loop
  res.sendFile(__dirname + "/upload.html");
});

io.on('connection', function(socket) {
  console.log('client connected');
  socket.emit('test', Date.now());
});

http.listen(3000, function() {
  console.log('Example app listening on port 3000!');
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
