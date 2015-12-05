'use strict';
const _ = require('lodash');
class PokerRule {

  /*
   * @params name {String}
   * @params rule {(Array<Card>) => Boolean}
   */
  constructor(name, rule){
    this.props = {
      name: name,
      rule: rule
    }
  }

  name(){
    return this.props.name;
  }

  checkAllowed(cardIndexs) {
    const cards = cardIndexs.map(PokerRule.representCard);
    return this.validatePlay(cards);
  }

  validatePlay(cards){
    return this.props.rule(cards);
  }

  static representCard(cardId){
    var cardOrder = PokerRule.cardOrder();
    var suitOrder = PokerRule.suitOrder();
    var scoreIndex = parseInt(cardId / suitOrder.length);
    var suitsIndex = cardId % suitOrder.length;
    return {suit: suitOrder[suitsIndex], value: cardOrder[scoreIndex]};
  }

  static cardOrder(){
    return [3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "As", 2];
  }

  static suitOrder(){
    return ["Diamond", "Clover", "Heart", "Spade"];
  }
}

const Pair = new PokerRule("Pair", (cards) => {
  if(cards.length != 2){ return false; }
  if(cards[0].value != cards[1].value) { return false; }
  return true;
})

const Triplet = new PokerRule("Triplet", (cards) => {
  if(cards.length != 3) { return false; }
  if(cards.filter((card) => card.value != cards[0].value).length >= 1) { return false; }
  return true;
})

const Bomb = new PokerRule("Bomb", (cards) => {
  if(cards.length != 4) { return false; }
  if(cards.filter((card) => card.value != cards[0].value).length >= 1) { return false; }
  return true;
})

const Straight = new PokerRule("Straight", (cards) => {
  if(cards.length != 5) { return false; }
  const indexs = _(cards).map((card) => PokerRule.cardOrder().indexOf(card.value)).sort((a, b) => a - b);

  const pairToTest = indexs.zip(indexs.drop(1).value());
  const pairResult = pairToTest.map((ids) => {
    const id1 = ids[0];
    const id2 = ids[1];
    if(id1 == id2 - 1) { return true; }
    if(id1 == 12 && id2 == 0) { return true; };
    if(id2 == undefined) { return true;} // endOfTheList;
    return false;
  })
  const isStraight = pairResult.all((result) => result);
  return isStraight;
})

const Color = new PokerRule("Color", (cards) => {
  if(cards.length != 5) { return false; }
  if(cards.filter((card) => card.suit != cards[0].suit) != 0) { return false; }
  return true;
})


const FullHouse = new PokerRule("FullHouse", (cards) => {
  if(cards.length != 5) { return false; }
  let value1 = cards[0].value;
  let value2 = cards.filter((card) => card.value != value1)[0].value;
  if(cards.filter((card) => card.value == value1).length != 3) { return false; }
  if(cards.filter((card) => card.value == value2).length != 2) { return false; }
  return true;
})

const StraightFlush = new PokerRule("StraightFlush", (cards) => {
  if(cards.length != 5) { return false; }
  if(!Straight.validatePlay(cards)) { return false; }
  if(!Color.validatePlay(cards)) { return false; }
  return true;
})

const Single = new PokerRule("Single", (cards) => {
  return cards.length == 1;
})

const Pass = new PokerRule("Pass", (cards) => {
  return cards.length == 0;
})

exports.Pair = Pair;
exports.Triplet = Triplet;
exports.Bomb = Bomb;
exports.Color = Color;
exports.Straight = Straight;
exports.FullHouse = FullHouse;
exports.StraightFlush = StraightFlush;
exports.Single = Single;
exports.Pass = Pass;
exports.PokerRule = PokerRule;
