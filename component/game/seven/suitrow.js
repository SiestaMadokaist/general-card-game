"use strict";
const _ = require("lodash");
_.assert = require("underscore.assert");
const SUIT = require("./suit.js");
const Card = require("./card.js");
const CARDVALUE = Card.CARDVALUE;

class SuitRow{
  /*
   * @param suit {SUIT}
   */
  constructor(suit){
    this._state = {
      top: CARDVALUE.SEVEN,
      bottom: CARDVALUE.SEVEN,
      available: false,
    }
    this.props = {
      suit: suit,
    }
  }

  suit(){
    return this.props.suit;
  }

  suitName(){
    return SUIT.inverse(this.suit());
  }

  top(){
    if(this._state.top < 13){
      return Card.toCard({
        value: this._state.top,
        suit: this.suit()
      })
    } else {
      return Card.toCard({
        value: 1,
        suit: this.suit()
      });
    }
  }

  bottom(){
    return Card.toCard({
      value: this._state.bottom,
      suit: this.suit()
    })
  }

  hasReachedKing(){
    return this._state.top == CARDVALUE.KING
  }

  hasReached2(){
    return this._state.bottom == 2;
  }

  /*
   * @param card {Card}
   * TODO: need a global check where was the other ace closing
   * probably better not to check in this class, but in the game itself
   * also need to check if we can put seven of this suit
   * it should be handled by the Game itself though probably
   */
  validateLegitPlay(card){
    if(card.isJoker()){
      _.assert(this.isAvailable(), true, "even joker cannot be played in slot of 7");
    } else {
      _.assert(this.suit() == card.suit(), `${card} cannot be played in the row of ${this.suitName()}`);
      if(card.isAce()){
        _.assert(this.hasReached2() || this.hasReachedKing(), "Ace can only be played after King or 2 is played");
      } else if(card.isSeven()) {
        _.assert(!this.isAvailable(), false, "how the fuck did you even play the same seven twice");
      } else if(card.isAboveSeven()) {
        _.assert(this.isAvailable(), `suit row of ${this.suitName()} is not ready to be played yet`)
        _.assert(card.isSuccessor(this.top()), `cannot put ${card} above ${this.top()}`);
      } else if(card.isBelowSeven()) {
        _.assert(this.isAvailable(), `suit row of ${this.suitName()} is not ready to be played yet`)
        _.assert(card.isPredecessor(this.bottom()), `cannot put ${card} below ${this.bottom()}`);
      }
    }
    return true;
  }

  isAvailable(){
    return this._state.available;
  }

  put(card){
    _.assert(!card.isJoker(), "please use putAbove / putBelow instead of just put");
    _.assert(!card.isAce(), "please use putAbove / putBelow instead of just put");
    this.validateLegitPlay(card);
    if(card.isSeven()){
      this._state.available = true;
    }else if(card.isAboveSeven()){
      this.putAbove(card);
    }else if(card.isBelowSeven()){
      this.putBelow(card);
    }else{
      throw new Error(`what the fuck is ${card}`);
    }
  }

  topped(){
    return this._state.top > CARDVALUE.KING;
  }

  bottomed(){
    return this._state.bottom < 2;
  }

  // @params card {Card}
  putAbove(card){
    this.validateLegitPlay(card);
    this._state.top++;
    if(card.isAce()){
      _.assert(this.topped(), "ace cannot be played with putAbove if it has not reach top")
      this._state.available = false;
    }
  }

  putBelow(card){
    this.validateLegitPlay(card);
    this._state.bottom--;
    if(card.isAce()){
      _.assert(this.bottomed(), "ace cannot be played with putAbove if it has not reach top")
      this._state.available = false;
    }
  }
}

module.exports = SuitRow
