'use strict';
const $assert = require("underscore.assert");
const _ = require("lodash");
class Room {
  /*
   * @param gameClass {Class<GAME>}
   * probably should focus handle IO class instead
   */
  constructor(gameClass, roomName, playerLimit, roomSocket){
    this.props = {
      roomName: roomName,
      playerLimit: playerLimit,
      gameClass: gameClass,
      roomSocket: roomSocket
    }
    this.state = {
      activePlayerId: undefined,
      game: undefined,
      players: [],
      decks: undefined
    }
  }

  gameClass(){
    return this.props.gameClass;
  }

  // @params kwargs {Object}
  // kwargs.cardLimit: {Integer}
  // e.g: 52 or 54
  start(kwargs){
    $assert(this.players().length == this.playerLimit());
    const GameConstructor = this.gameClass();
    const game = new GameConstructor(this);
    this.state.game = game;
    game.start(kwargs);
    // TODO: handle socket connection as well here
  }

  // @params kwargs {Object}
  // any additional parameters that needs to be passed to play this game
  play(player, card, kwargs){
    $assert(player == this.activePlayer());
    this.game().play(this.activePlayer(), card, kwargs);
    // TODO: need socket
  }

  game(){
    return this.state.game;
  }

  roomName(){
    return this.props.roomName;
  }

  playerLimit(){
    return this.props.playerLimit;
  }

  players(){
    return this.state.players;
  }

  addPlayer(player){
    $assert(this.players().length < this.playerLimit());
    $assert(this.players().filter((p) => p == player).length == 0)
    this.state.players.push(player);
    // TODO: handle socket connection here
  }

  amountOfPlayerToWait(){
    return this.playerLimit() - this.players().length;
  }

  isWaitingForPlayer(){
    return this.amountOfPlayerToWait >= 1;
  }

}

module.exports = Room;
