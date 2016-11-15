'use strict';
const $assert = require("underscore.assert");
class Player {
  constructor(name, socket){
    this.props = {
      name: name,
      socket: socket
    }
    this.state = {
      isActive: false,
      cards: [],
      room: undefined
    }
  }

  /*
   * @params room {Room}
   */
  join(room){
    $assert.assert(this.room() == undefined, `already joined ${this.room()}`);
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
  play(cardIndexs, kwargs){
    $assert.assert(this.isActive(), "status still inactive");
    var playedCards = cardIndexs.map((i) => this.state.cards[i]);
    this.room().play(this, playedCards, kwargs);
  }

  addCard(card){
    this.state.cards.push(card);
  }

}

module.exports = Player;
