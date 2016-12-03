'use strict';
const $assert = require("underscore.assert");
const _PLAYER = {};
class Player {

  static fetch(options){
    if(_PLAYER[options.playerName] == undefined){
      _PLAYER[options.playerName] = new Player(options.playerName, options.playerSocket);
    }
    return _PLAYER[options.playerName];
  }

  constructor(name, socket){
    this.props = {
      name: name,
      socket: socket
    }
    this.state = {
      isActive: false,
      cards: [],
      closedCards: [],
      room: undefined
    }
  }

  /*
   * @params room {Room}
   */
  join(room){
    $assert(this.room() == undefined, `already joined ${this.room()}`);
    this.state.room = room;
    room.addPlayer(this);
  }

  room(){
    return this.state.room;
  }

  cards(){
    return this.state.cards;
  }

  /**
   * @params cardIndexs {Array<Integer>}
   * @params kwargs {Object} any additional parameter
   * index of card in this players hand
   */
  playOne(cardIndex, kwargs){
    var playedCards = this.cards()[cardIndex];
    this.room().playOne(this, playedCards, kwargs);
  }

  close(cardIndex){
    this.state.closedCards.push(this.cards()[cardIndex])
  }

  removeCard(card){
    const idx = this.cards().indexOf(card);
    $assert(idx != -1, "card to remove not found");
    this.state.cards.splice(idx, 1);
  }

  addCard(card){
    this.state.cards.push(card);
  }

  name(){
    return this.props.name;
  }

}

module.exports = Player;
