import { DIAMOND, CLOVER, HEART, SPADE } from './SuitRowFactory';
import { SuitRowFactory as SRF } from './SuitRowFactory';
import { fromJS } from 'immutable';
import { imageHost } from 'config';

class Card {
  static fromMap(map){
    return new Card(map.get("suit"), map.get("value"))
  }

  constructor(suit, value){
    this.props = {
      suit: suit,
      value: value
    }
  }

  getImageSource(){
    return `${imageHost}${this.value()}-of-${this.suitName()}.png`
  }

  value(){
   return this.props.value;
  }

  suit(){
    return this.props.suit;
  }

  suitName(){
    return SRF.inverseEnum(this.suit())
  }

  toMap(){
    return fromJS(this.props);
  }

}

exports.Card = Card;
