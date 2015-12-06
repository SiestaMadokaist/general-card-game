'use strict';
var Room = require('./room.js').Room;

class Home{

  // @params socket {Socket.IO}
  constructor(socket){
    this.state = {
      rooms: [],
      socket: socket
    }
  }

  socket(){
    return this.state.socket;
  }

  // @params roomName {String}
  // @params callback {Function}
  getRoom(roomName, callback){
    var rooms = this.state.rooms.filter((room) => room.name() == roomName);
    if(rooms.length == 1){
      var room = rooms[0];
      return callback(room);
    }
  }

  // @params roomName {String}
  // @params player {Player}
  // @return null
  joinRoom(roomName, player){
    this.getRoom(roomName, (room) => {
      room.addPlayer(player);
    });
  }

  // @params roomName {String}
  // @params playerLimit {Integer}
  // @params cardLimit {Integer}
  // @params game {Game}
  createRoom(roomName, playerLimit, cardLimit, game){
    var room = this.getRoom(roomName, (room) => room);
    if(room == undefined || room == null){
      this.state.rooms.push(new Room(roomName, playerLimit, cardLimit, new game(playerLimit)))
    }
  }
}

exports.Home = Home;
