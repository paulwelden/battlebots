var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

io.on('connection', function (socket) {
	console.log('client connected');
	socket.emit('test', Date.now());
});

http.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});