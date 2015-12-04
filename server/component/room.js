'use strict';
class Room {
  // @params playerCount {Integer}
  // amount of player
  // game won't start until this room had that much player
  constructor(roomName, playerCount){
    this.state = {
      name: roomName,
      playerCount: playerCount,
      cards: this.generateCards()
    }
  }

  name(){
    return this.state.name;
  }

  playerCount(){
    return this.state.playerCount;
  }

  generateCards(){
  }

}

exports.Room = Room;

