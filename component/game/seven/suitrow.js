"use strict";
const _ require("lodash");

const SUIT = {
    DIAMOND: 0,
    CLOVER: 1,
    HEART: 2,
    SPADE: 3
}


// well, this is more or less, how we define constant without value (only object reference) in javascript, isnt it?

function ACE(){ _.assert(false, "this function is not defined to be called, it`s supposed to be a constant you compare to")}
function JOKER(){ _.assert(false, "this function is not defined to be called, it`s supposed to be a constant you compare to")}

const SEVEN = 7;

class SuitRow{
    /*
     * @param suit {SUIT}
     */
    constructor(suit){
        this.state = {
            top: SEVEN,
            bottom: SEVEN,
            available: false,
        }
        this.props = {
            suit: suit
        }
    }

    suit(){
        return this.props.suit;
    }

    top(){
        return this.state.top;
    }

    bottom(){
        return this.state.bottom;
    }

    hasReachedKing(){
        return this.state.top == KING
    }

    hasReached2(){
        return this.state.bottom == 2;
    }

    /*
     * @param card {Card}
     */
    validateLegitPlay(card){
        // TODO: need a global check where was the other ace closing
        // probably better not to check in this class, but in the game itself
        // also need to check if we can put seven of this suit
        // it should be handled by the Game itself though probably
        if(card.isSeven()) {
           _.assert(!this.state.available, `${SEVEN} of ${this.suit()} has not come out`);
        }else if(card.isJoker()) {
            return true
        }
        // ASSERTION
        _.assert(card.suit == this.suit(), `cannot append ${card.suit} into ${this.suit()}`);
        if(card.isAce()){
            if(card.aboveSeven()){
                // ASSERTION
                _.assert(card.isSuccessor(this.top()), `cannot append ${card.value} of ${card.suit} into ${this.suit()}`);
            }else if(card.belowSeven()){
                // ASSERTION
                _.assert(card.isPredecessor(this.bottom()), `cannot append ${card.value} of ${card.suit} into ${this.suit()}`);
            }
        }else{
            // ASSERTION
            _.assert(this.hasReachedKing() || this.hasReached2());
        }
        return true;
    }

    // @params card {Card}
    addAbove(card){
        validateLegitPlay(card);
        this.state.top++;
    }

    addBelow(card){
        validateLegitPlay(card);
        this.state.bottom--;
    }
}

exports = SuitRow
