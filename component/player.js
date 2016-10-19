'use strict';
class Player {
    constructor(name, room){
        this.state = {
            cards: []
        }
        this.props = {
            name: name,
            room: room
        }
        this.memoized_props = {
            id: this.id(),
        }
    }

    /*
     * function alias for identifier;
     */
    id(){
        if(this.props == undefined || this.props.id == undefined){
            return Math.floor(Math.random() * 1000000)
        }else{
            return this.props.id;
        }
    }

    room(){
        return this.props.room;
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
