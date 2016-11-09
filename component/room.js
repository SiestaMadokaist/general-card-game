'use strict';
const $assert = require("underscore.assert");
const _ = require("lodash");
class Room {
  /**
   * @params roomName {String}
   * @params playerLimit {Integer}
   * amount of player
   * game won't start until this room had that much player
   * @params cardLimit {Integer}
   * 52 for a game without joker, 54 for two joker.
   * TODO: validate the value;
   * TODO: still developed under the assumption that cardLimit would always be 52
   */
  constructor(name, playerLimit, cardLimit, gameClass){
    const mutablePlayers = [];
    const deck = [];
    // this variable will be mutable by game or room
    // the plan is only room may mutate the players
    // and by doing so, the game players would also be mutated
    this.props = {
        name: name,
        playerLimit: playerLimit,
        gameClass: gameClass
    };
    this.memoized_props = {
        game: undefined
    };
    this.state = {
      players: mutablePlayers,
      cardLimit: cardLimit,
    };
  }

  start(){
      $assert(this.players().length == this.props.playerLimit);
      const players = this.players();
      const initialDeck = this.game().initialDeck();
      const divNumber = initialDeck.length / players;
      const cardPickerCallback = (n) => {
           _(initialDeck)
              .zip(_.range(initialDeck.length()))
              .filter((card, i) => i % players.length() == n)
              .map((card, i) => card)
              .value()
      }
      const playerCards = _.range(players.length())
  }

  game(){
      if(this.memoized_props.game === undefined){
          this.memoized_props.game = new this.props.gameClass(this);
      }
      return this.memoized_props.game;
  }

  name(){
    return this.props.name;
  }

  playerLimit(){
    return this.props.playerLimit;
  }

  players(){
      return this.state.players;
  }

  addPlayer(playerName){
      const player = new Player(playerName, this)
      this.state.players.push(player);
  }

  amountOfPlayerToWait(){
    return this.state.playerLimit - this.state.players.length;
  }

  isWaitingForPlayer(){
    return this.amountOfPlayerToWait >= 1;
  }

}

exports.Room = Room;
