const _ = require("lodash");
class Seven{
    /*
     * @params playerLimit {Integer}
     * if you want to play with just 3 or 4 player
     * @params cardCount {Integer}
     * 52 for a game without joker, 54 for a game with joker
     */
    constructor(playerLimit, cardCount){
        _.assert(cardCount == 52 || cardCount == 54, "card count must be either 52 or 54")
        this.state = {
            ready: false,
            player: undefined,
            players: [],
            suits: _.range(4).map((i) => new Suit(i))
        };
        this.props = {
            cardPools: _.range(cardCount).map((i) => SevenRule.represent)
        };
    };

}
