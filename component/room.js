'use strict';
const $assert = require("underscore.assert");
const _ = require("lodash");
const _ROOM = {};
class Room {

  static fetch(options){
    if(_ROOM[options.roomName] == undefined){
      _ROOM[options.roomName] = new Room(options.game, options.roomName, options.playerLimit)
    }
    return _ROOM[options.roomName]
  }

  /*
   * @param gameClass {Class<GAME>}
   * probably should focus handle IO class instead
   */
  constructor(gameClass, roomName, playerLimit){
    this.props = {
      roomName: roomName,
      playerLimit: playerLimit,
      gameClass: gameClass,
    }
    this.state = {
      activePlayerId: undefined,
      game: undefined,
      players: [],
      started: false,
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
    $assert(!this.started(), "game has alreday started");
    const GameConstructor = this.gameClass();
    const game = new GameConstructor(this);
    this.state.game = game;
    game.start(kwargs);
    this.state.started = true;
    // TODO: handle socket connection as well here
  }

  started(){
    return this.state.started;
  }

  // @params kwargs {Object}
  // any additional parameters that needs to be passed to play this game
  play(player, cards, kwargs){
    this.game().play(player, cards, kwargs);
    // TODO: need socket
  }

  playOne(player, card, kwargs){
    this.game().play(player, card, kwargs);
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
