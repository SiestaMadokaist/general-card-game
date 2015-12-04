'use strict';
class Player {
  constructor(name){
    this.state = {
      name: name,
      identifier: this.identifier(),
      cards: []
    }
  }

  identifier(){
    if(this.state == undefined || this.state.identifier == undefined){
      return Math.floor(Math.random() * 1000000)
    }else{
      return this.state.identifier;
    }
  }

  takeCard(card){
    this.state.cards.push(card);
  }

  cards(){
    return this.state.cards;
  }

}

exports.Player = Player;
