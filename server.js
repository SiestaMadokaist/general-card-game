//	Customization
var appPort = 16558;

// Librairies
var express = require('express'), app = express();
var http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);


var jade = require('jade');

const Seven = require("./component/game/seven")

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('home.jade');
});

Seven.initializeIO(io.of("/game.seven"))
server.listen(appPort);

console.log("Server listening on port " + appPort);
io.of("/test").on('connection', function (socket) { // First connection
	socket.on('message', function (data) { // Broadcast the message to all
        io.of("/test").emit("room-of-true").emit("message", data);
	});
    socket.on("join", function(data){
        console.log(`joining ${socket.id} into ${data.room}`);
        socket.join(data.room);
    })
	socket.on('disconnect', function () { // Disconnection of the client
	});
});
