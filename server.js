//	Customization
require("node-jsx").install();

const appPort = 16558;

// Librairies
const express = require('express');
const http = require('http');
const app = express();

// Component
const SevenSocketHandler = require("./component/game/seven/io.js");

// UI
const Home = require("./ui/home.jsx");

const server = http.createServer(app);
SevenSocketHandler.listen(server);

app.get("/", (req, res) => {
  const reactHTML = React.renderToString(Home({}));
  res.render("index.ejs", {reactOutput: reactHTML})
})

// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
// app.set("view options", { layout: false });
//
// app.use(express.static(__dirname + '/public'));

// app.get('/', function(req, res){
  // res.render('home.jade');
// });

server.listen(appPort);
console.log("Server listening on port " + appPort);

// io.of("/seven").on("connection", (socket) => {
  // socket.on("play", (data) => {
    // const player = Player.fetch({
      // playerName: data.playerName,
    // })
    // player.playOne(data.cardId, {
      // suit: data.suit,
      // direction: data.direction
    // })
  // })
// 
  // socket.on("start", (data) => {
    // const room = Room.fetch({
      // roomName: data.RoomName
    // });
    // room.start({
      // cardLimit: data.cardLimit
    // });
  // })
//
  // socket.on("join", (data) => {
    // const player = Player.fetch({
      // playerName: data.playerName,
      // playerSocket: socket
    // })
    // const room = Room.fetch({
      // game: Seven,
      // roomName: data.roomName,
      // playerLimit: data.playerLimit
    // });
    // player.join(room);
    // socket.join(data.roomName);
    // console.log(`${player.name()} joined  ${room.roomName()}`)
  // })
// })
