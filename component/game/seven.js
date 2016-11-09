const _ = require("lodash");
const Card = require("./seven/card.js")
const Room = require("../room.js")
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
            room: room
        }
    };

    static initializeIO(io){
        Seven.ROOMS = {}
        Seven.IO = io;
        Seven.IO.on("connection", (socket) => {
            socket.on("join", (data) => {
                Seven.join(data, socket)
            })
            socket.on("disconnect", (data) => {
                Seven.disconnect(data, socket)
            })
        })
    }

    /*
     * @params data {Object.room_id => String}
     * @params socket {Socket}
     */
    static join(data, socket){
        const room = Seven.find_or_create(data);
        const player = Seven.find_or_create(socket.id)
        socket.join(room.name());
    }


    /*
     * @params data {Object}
     * data .room_id :required
     * data .playerLimit :required
     * data .cardLimit :required
     * data .gameClass :required
     */
    static find_or_create(data){
        const room = Seven.ROOMS[data.room_id];
        if(room === undefined){
            return new Room(data.room_id, data.playerLimit, data.cardLimit, data.gameClass)
        } else {
            return room
        }
    }


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

module.exports = Seven
