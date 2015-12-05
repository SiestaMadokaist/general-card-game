'use strict';
class Player {
  constructor(name, room){
    this.state = {
      cards: []
    }
    this.props = {
      name: name,
      identifier: this.identifier(),
      room: room
    }
  }

  identifier(){
    if(this.props == undefined || this.props.identifier == undefined){
      return Math.floor(Math.random() * 1000000)
    }else{
      return this.props.identifier;
    }
  }

  id(){
    return this.identifier();
  }

  takeCard(card){
    this.state.cards.push(card);
  }

  // @params card_indexs {Array<Integer>}
  play(card_indexs){
    var playedCards = card_indexs.map((i) => this.state.cards[i]);
    this.props.room.play(this, playedCards);
  }

  cards(){
    return this.state.cards;
  }

}

exports.Player = Player;
