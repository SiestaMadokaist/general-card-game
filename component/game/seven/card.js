"use strict";
const _ = require("lodash");
_.assert = require("underscore.assert");
const SUIT = require("./suit.js");

const NORMAL_CARD_LIMIT = 52;

const CARDVALUE = {
    SEVEN: 7,
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    ACE: 1
}

class Card{
    constructor(value, suit){
        this.props = {
            value: value,
            suit: suit
        }
    }

    value(){
        return this.props.value;
    }

    suit(){
        return this.props.suit;
    }

    suitName(){
        return SUIT.inverse(this.suit());
    }

    toString(){
        return `{value: ${this.value()}, suit: ${this.suitName()}}`;
    }

    /*
     * @params card {Card}
     * (this card is the next card after `card`)
     */
    isSuccessor(card){
        if(card.suit() !== this.suit()){
            return false;
        }else if(this.isAce() && card.isKing()){
            return true;
        }else if(this.value() != card.value() + 1){
            return false;
        }
        return true;
    }

    /*
     * @params card {Card}
     */
    isPredecessor(card){
        if(card.suit() !== this.suit()){
            return false;
        }else if(this.value() != card.value() - 1){
            return false;
        }
        return true
    }

    isJoker(){
        return false;
    }

    isBelowSeven(){
        return this.value() < CARDVALUE.SEVEN;
    }

    isAboveSeven(){
        return this.value() > CARDVALUE.SEVEN;
    }

    isAce(){
        return this.value() == CARDVALUE.ACE;
    }

    isSeven(){
        return this.value() == CARDVALUE.SEVEN;
    }

    isJack(){
        return this.value() == CARDVALUE.JACK;
    }

    isQueen(){
        return this.value() == CARDVALUE.QUEEN;
    }

    isKing(){
        return this.value() == CARDVALUE.KING;
    }


}

class ImaginaryCard extends Card {
    value(){
        return 14;
    }

    suit(){
        throw new Error("for now this is error");
    }
}

class Joker extends Card {

    value(){
        throw new Error("for now this is error");
    }

    isAce(){
        return true;
    }

    suit(){
        throw new Error("for now this is error");
    }

    /*
     * @param _ {Card}
     * though it doesn`t matter
     */
    isSuccessor(_){
        return true;
    }

    /*
     * @param _ {Card}
     * though it doesn`t matter
     */
    isPredecessor(_){
        return true
    }

    isJoker(){
        return true;
    }

    /*
     * not really usefull but, maybe will be usefull
     */
    isSeven(){
        return false;
    }

    /*
     * ensuring the game doesn`t become random when joker is put down
     */
    isBelowSeven(){
        throw `Joker card can not be checked whether it is below or above seven`;
    }

    isAboveSeven(){
        this.isBelowSeven();
        // lazy yo
    }

}



module.exports.fromValue = (i) => {
    if(i < 0){
        return new ImaginaryCard();
    }else if(i < NORMAL_CARD_LIMIT && i >= 1){
        const value = i % 13;
        const suit = Math.floor(i / 13);
        return new Card(value + 1, suit)
    }else{
        return new Joker();
    }
}

module.exports.toCard = (cardObj) => {
    const value = cardObj.value;
    const suit = cardObj.suit;
    _.assert(value <= 13, ".value cant be greater than 13");
    _.assert(value >= 1, ".value cant be lower than 1");
    _.assert(suit <= SUIT.MAX, ".that`s not a valid suit")
    _.assert(suit >= SUIT.MIN, ".that`s not a valid suit")
    return exports.fromValue(value - 1 + (suit * 13));
}

module.exports.imaginary = (cardObj) => {
    const value = cardObj.value;
    const suit = cardObj.suit;
    _.assert(value <= 14, ".value cant be greater than 13");
    _.assert(value >= 1, ".value cant be lower than 1");
    _.assert(suit <= SUIT.MAX, ".that`s not a valid suit")
    _.assert(suit >= SUIT.MIN, ".that`s not a valid suit")
    return exports.fromValue(-1);
}

module.exports.CARDVALUE = CARDVALUE;
