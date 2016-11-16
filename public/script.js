var roomName = `SEVEN-${location.hash}`;
var playerName= `Ramadoka-${Math.random()}`

var socket = io("/seven").connect();

socket.on("connect", () => {
  socket.emit("join", {
    roomName: roomName,
    playerName: playerName,
    playerLimit: 4
  })
})
