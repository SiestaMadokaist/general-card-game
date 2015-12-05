'use strict';

const _ = require('lodash');
/*
 * define the rule for poker here
 * probably should've implement / extend Game.Base
 */
class Poker {
  constructor(){
    this.state{
      lastPlayed: undefined;
    }
  }

  validatePlay(player, cards){
    if(cards.some((card) => player.cards().indexOf(card) == -1)){
      throw `dammit you player ${player.name} you cheating bastard`;
    }
    if(this.lastPlayedCards() == undefined){
      return true;
    }
  }

  executePlay(player, cards){
  }
}

exports.Player = Player;
