const _SOCKET = require("socket.io");
const Room = require("../../room.js");
const Seven = require("../seven.js")
const Player = require("../../player.js");

class SocketHandler{
  static listen(server){
    this.props = {
      connection: _SOCKET.listen(server)
    }
  }

  static namespace(){
    return "/SEVEN";
  }

  static connection(){
    return this.props.connection;
  }

  /*
   * @params eventName {String}
   * @params callback {Object}
   */
  static run(){
    this.connection().of(this.namespace())
      .on("connection", this.onConnection())
  }

  static onConnection(socket){
    socket.on("play", (data) => this.onPlay(socket, data));
    socket.on("start", (data) => this.onStart(socket, data));
    socket.on("join", (data) => this.onJoin(socket, data));
  }

  static onJoin(socket, data){
    const player = Player.fetch({
      playerName: data.playerName,
      playerSocket: socket
    });
    const room = Room.fetch({
      game: Seven,
      roomName: data.roomName,
      playerLimit: data.playerLimit
    });
    player.join(room);
    socket.join(data.roomName);
  }

}

module.exports = SocketHandler
