const _ = require("lodash");
const card = require("./card.js")
class Seven{
    /*
     * @params playerLimit {Integer}
     * if you want to play with just 3 or 4 player
     * @params cardCount {Integer}
     * 52 for a game without joker, 54 for a game with joker
     * @params players {Array<Player>}
     * @params callbacks {Object<Function0>}
     * @params callbacks :onPlayerAdded
     * @params callbacks :onPlayerRemoved
     */
    constructor(room){
        this.props = {
            room: room;
        }
    };

    onPlayerAdded(){
        if(this.props.callbacks === undefined){
            return () => {}
        }else{
            return this.props.callbacks.onPlayerAdded()
        }
    }

    onPlayerRemoved(){
        if(this.props.callbacks === undefined){
            return () => {}
        }else{
            return this.props.callbacks.onPlayerRemoved()
        }
    }

    room(){
        return this.props.room;
    }

    players(){
        return this.room().players()
    }

    dividedDeck(){
        const pools = this.props.cardPools;
        const shuffled = _.shuffle(pools);
    }

    // @params player {Player}
    addPlayer(player){
        this.players().push(player);
        this.onPlayerAdded();
    }

    // @params player {Player}
    removePlayer(player){
        this.state.players = this.state.players.filter((p) => p.id != player.id);
        this.onPlayerRemoved();
    }

    start(){
    }
}
