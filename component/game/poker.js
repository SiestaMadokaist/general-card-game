'use strict';
/*
 * define the rule for poker here
 * probably should've implement / extend Game.Base
 */
const PP = require('./poker/play.js');
const _ = require('lodash');
const Pair = PP.Pair;
const Triplet = PP.Triplet;
const Bomb = PP.Bomb;
const Flush = PP.Flush;
const Straight = PP.Straight;
const FullHouse = PP.FullHouse;
const StraightFlush = PP.StraightFlush;
const Single = PP.Single;
const Pass = PP.Pass;
const PR = PP.PokerRule;

class Poker {
  constructor(playerLimit){
    this.state = {
      ready: false,
      player: undefined,
      players: undefined
    };
    this.props = {
      playerLimit: playerLimit,
      plays: [
        StraightFlush,
        FullHouse,
        Flush,
        Straight,
        Bomb,
        Triplet,
        Pair,
        Single,
        Pass
      ],
      playedCards: new Array(52)
    };
    this.cardPoolsWithIndex = _.range(52).map((i) => [PR.representCard(i), i]);
  }

  setPlayers(players){
    this.state.players = players;
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
    if(! this.allowPlayer(player)) { throw `please wait until your turn` }
    this.validatePlay(player, cardIndexs);
    let play = this.selectPlay(cardIndexs);
    this.updatePlayer()
  }

  updatePlayer(){
    this.state.player = (this.state.player + 1) % this.props.playerLimit;
  }

  static inversePresentedCard(card){
    const result = Poker.cardPoolsWithIndex.filter((cardAndIndex) => {
      const xcard = cardAndIndex[0];
      const index = cardAndIndex[1];
      return xcard.value === card.value && xcard.suit == card.suit;
    });
    if(result.length == 0){
      throw card;
    }
    if(result[0].length == 0){
      throw result;
    }
    return result[0][1];
  }

  validatePlay(player, cards){
    if(cards.some((card) => player.cards().indexOf(card) == -1)){
      throw `dammit you player ${player.name} you cheating bastard`;
    }
    if(this.lastPlayedCards() == undefined){
      return true;
    }
  }
}

exports.Poker = Poker;
