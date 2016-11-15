"use strict";
const _ = require("lodash");
const $assert = require("underscore.assert");
const Room = require("../room.js");

const Card = require("./seven/card.js");
const SuitRow = require("./seven/suitrow.js");
const SUIT = require("./seven/suit.js");

class Seven{
  /*
   * @param deck {Array<Card>}
   * @param players {Array<Player>}
   */
  static divideDeck(deck, players){
    const l = deck.length;
    for(let i = 0; i < l; i++){
      let topCard = deck.pop();
      let idx = i % players.length;
      let player = players[idx];
      player.addCard(topCard);
    }
    // sanity check after dividing card
    $assert(deck.length == 0, `deck is not empty, still: ${deck.length} card`);
  }

  static constructDeck(cardLimit){
    return _.range(cardLimit).map((i) => Card.fromValue(i));
  }

  constructor(room){
    this.props = { room: room }
    this.state = {
      suitrow: {
        DIAMOND: new SuitRow(SUIT.DIAMOND),
        CLOVER: new SuitRow(SUIT.CLOVER),
        HEART: new SuitRow(SUIT.HEART),
        SPADE: new SuitRow(SUIT.SPADE)
      },
      activePlayerId: undefined
    }
  }

  static isSevenSpadeOwner(player){
    return player
      .cards()
      .filter((card) => card.isSevenSpade())
      .length > 0
  }

  // kwargs {Object}
  // kwargs.cardLimit: {Integer}
  start(kwargs){
    const deck = _(Seven.constructDeck(kwargs.cardLimit)).shuffle().value();
    Seven.divideDeck(deck, this.players());
    const starter = this
      .players()
      .filter(Seven.isSevenSpadeOwner)[0];
    const starterId = this
      .players()
      .indexOf(starter);
    this.initializeActivePlayer(starterId)
  }

  initializeActivePlayer(playerId){
    this.state.activePlayerId = playerId;
  }

  setNextPlayerAsActive(){
    this.state.activePlayerId = this.nextActivePlayerId()
  }

  nextActivePlayerId(){
    return (this.state.activePlayerId + 1) % this.playerLimit();
  }

  activePlayerId(){
    return this.state.activePlayerId;
  }

  activePlayer(){
    return this.players()[this.activePlayerId()]
  }

  players(){
    return this.room().players();
  }

  room(){
    return this.props.room;
  }

  /*
   * @params kwargs: {Object}
   * @params kwargs.direction {Integer}
   * kwargs.suit {SUIT}
   * kwargs.direction == 1 => put on top
   * kwargs.direction == 0 => put
   * kwargs.direction == -1 => put on below
   */
  play(player, card, kwargs){
    $assert(player == this.activePlayer(), "not your turn yet");
    $assert(player.cards.filter((card) => card == card).count > 0, "you dont have that card wtf");
    $assert(kwargs.direction == 0 || kwargs.direction == 1 || kwargs.direction == -1);
    const suitrow = SUIT.inverse(kwargs.suit);
    if(kwargs.direction == 0){
      suitrow.put(card);
    }else if(kwargs.direction == 1){
      suitrow.putAbove(card);
    }else if(kwargs.direction == -1){
      suitrow.putBelow(card);
    }
  }
}

module.exports = Seven
