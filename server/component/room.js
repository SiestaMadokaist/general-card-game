'use strict';
class Room {
  // @params roomName {String}
  // @params playerLimit {Integer}
  // amount of player
  // game won't start until this room had that much player
  // @params cardLimit {Integer}
  // 52 for a game without joker, 54 for a game with joker
  constructor(roomName, playerLimit, cardLimit){
    this.state = {
      name: roomName,
      playerLimit: playerLimit,
      cardLimit: cardLimit || 52,
      players: [],
      deck: this.generateDeck()
    }
  }

  name(){
    return this.state.name;
  }

  playerLimit(){
    return this.state.playerLimit;
  }

  addPlayer(player){
    if(!this.inTheRoom(player)){
      this.state.players.push(player);
    }
  }

  gameOnProgress(){
    // return this.state.cardLimit != this.totalPlayerCards();
    return this.totalPlayerCards() >= 0;
  }

  totalPlayerCards(){
    return this.state.players.reduce((acc, player) => (acc + player.cards().length), 0)
  }

  amountOfPlayerToWait(){
    return this.state.playerLimit - this.state.players.length;
  }

  waitingForPlayer(){
    return this.amountOfPlayerToWait >= 1;
  }

  validateCardDividing(){
    if(!this.gameOnProgress()){
      throw `the game hasn't ended ${this.totalPlayerCards()} out of ${this.state.cardLimit}`
    }
    if(this.waitingForPlayer()){
      throw `still waiting for ${this.amountOfPlayerToWait()} people to join`;
    }
  }

  divideCard(){
    var deck = this.state.deck;
    var players = this.state.players;
    this.validateCardDividing();
    for(var index in deck){
      var card = deck[index];
      var player = players[index % players.length];
      player.takeCard(card);
    }
  }

  inTheRoom(player){
    return this.state.players.indexOf(player) != -1;
  }

  shuffleDeck(nTime){
    var deck = this.state.deck;
    for(var i = 0; i < nTime; i++){
      var top = Math.floor(Math.random() * deck.length);
      var bottom = Math.floor(Math.random() * (deck.length - top)) + top;
      this.state.deck = this.state.deck.splice(top, bottom).concat(this.state.deck);
    }
  }

  generateDeck(){
    var deck = [];
    for(var i = 0; i < 52; i++){
      deck.push(i);
    }
    return deck;
  }

}

exports.Room = Room;
