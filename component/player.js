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

  /*
   * function alias for identifier;
   */
  id(){
    return this.identifier();
  }

  /**
   * @params n {Integer}
   * transform back an integer to its card name;
   * e.g: representCard(51) => {value: "King", name: "Spade"};
  */
  // deprecated, order of the card is determined by wat game is played;
  representCard(n){
    let suits = ["Diamond", "Clover", "Hearts", "Spade"];
    let names = ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
    let nameIndex = parseInt(n / suits.length);
    let suitsIndex = n % suits.length;
    return {suits: suits[suitsIndex], value: scores[scoreIndex], name: names[nameIndex]};
  }

  /**
   * @params card {Integer}
   * the card id
   * e.g: takeCard(51) => give this player King of spades;
   */
  takeCard(card){
    this.state.cards.push(card);
  }

  /**
   * @params cardIndexs {Array<Integer>}
   */
  play(cardIndexs){
    var playedCards = cardIndexs.map((i) => this.state.cards[i]);
    this.props.room.play(this, playedCards);
  }

  cards(){
    return this.state.cards;
  }

}

exports.Player = Player;
