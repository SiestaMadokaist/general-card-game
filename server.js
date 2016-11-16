//	Customization
const Room = require("./component/room.js");
const Seven = require("./component/game/seven.js")
const Player = require("./component/player.js");

var appPort = 16558;

// Librairies
var express = require('express'), app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var jade = require('jade');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('home.jade');
});

server.listen(appPort);

console.log("Server listening on port " + appPort);

io.of("/seven").on("connection", (socket) => {
  socket.on("play", (data) => {
    const player = Player.fetch({
      playerName: data.playerName,
    })
    player.playOne(data.cardId, {
      suit: data.suit,
      direction: data.direction
    })
  })

  socket.on("start", (data) => {
    const room = Room.fetch({
      roomName: data.RoomName
    });
    room.start({
      cardLimit: data.cardLimit
    });
  })

  socket.on("join", (data) => {
    const player = Player.fetch({
      playerName: data.playerName,
      playerSocket: socket
    })
    const room = Room.fetch({
      game: Seven,
      roomName: data.roomName,
      playerLimit: data.playerLimit
    });
    player.join(room);
    socket.join(data.roomName);
    console.log(`${player.name()} joined  ${room.roomName()}`)
  })
})

// io.of("/test").on('connection', function (socket) { // First connection
	// socket.on('message', function (data) { // Broadcast the message to all
    // io.of("/test").emit("room-of-true").emit("message", data);
	// });
// 
  // socket.on("join", function(data){
    // console.log(`joining ${socket.id} into ${data.room}`);
    // socket.join(data.room);
  // })
// 
	// socket.on('disconnect', function () { // Disconnection of the client
	// });
// });
