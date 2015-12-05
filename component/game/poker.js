'use strict';
/*
 * define the rule for poker here
 * probably should've implement / extend Game.Base
 */
const PP = require('./poker.play.js');
const Pair = PP.Pair;
const Triplet = PP.Triplet;
const Bomb = PP.Bomb;
const Color = PP.Color;
const Straight = PP.Straight;
const FullHouse = PP.FullHouse;
const StraightFlush = PP.StraightFlush;
const Single = PP.Single;
const Pass = PP.Pass;

class Poker {
  constructor(){
    this.props = {
      plays: [
        StraightFlush,
        FullHouse,
        Color,
        Straight,
        Bomb,
        Triplet,
        Pair,
        Single,
        Pass
      ],
      playedCards: new Array(52)
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

  /*
   * @params cardIndexs {Integer};
   * card value that hasn't been transformed to a card
   * e.g: selectPlay([51, 0, 1, 2])
   * instead of selectPlay({suit: "...", value: "..."}...)
   */
  selectPlay(cardIndexs){
    const candidates = this.props.plays.filter((play) => play.checkAllowed(cardIndexs))
    if(candidates.length < 1) { throw `${cardIndexs} not a valid play` }
    if(candidates.length > 1) { /* should only be reached by straight flush*/ }
    return candidates[0];
  }

  executePlay(player, cardIndexs){
    this.validatePlay(player, cardIndexs);
    let play = this.selectPlay(cardIndexs);
  }


}

exports.Poker = Poker;
