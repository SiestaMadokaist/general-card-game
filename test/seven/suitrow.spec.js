"use strict";

const _ = require("lodash");
_.assert = require("underscore.assert");
const assert = require("assert");
const SUIT = require("../../component/game/seven/suit.js")
const SuitRow = require("../../component/game/seven/suitrow.js");
const Card = require("../../component/game/seven/card.js");

describe("SuitRow", () => {
    describe(".put", () =>{
        context("at start of game", () => {
            const sevenSpade = Card.toCard({value: 7, suit: SUIT.SPADE});
            const eightSpade = Card.toCard({value: 8, suit: SUIT.SPADE});
            const sixSpade = Card.toCard({value: 6, suit: SUIT.SPADE});
            const aceSpade = Card.toCard({value: 1, suit: SUIT.SPADE});
            const kingSpade = Card.toCard({value: 13, suit: SUIT.SPADE});
            const sevenDiamond = Card.toCard({value: 7, suit: SUIT.DIAMOND});
            const joker = Card.fromValue(53);
            it("available state should be false", () =>{
                const spadeRow = new SuitRow(SUIT.SPADE);
                assert.equal(spadeRow.isAvailable(), false, "state should be false");
            })

            it("doesnt raise error if you put sevenSpade first", () => {
                const spadeRow = new SuitRow(SUIT.SPADE);
                assert.doesNotThrow(() => spadeRow.put(sevenSpade), Error);
                assert.equal(spadeRow.isAvailable(), true, "state should change to true")
            })

            // TODO: shouldn`t be on the scope of put
            // put it in putAbove / putBelow
            it("must prevent other card from filling the slot of seven", () => {
                const spadeRow = new SuitRow(SUIT.SPADE);
                assert.throws(() => spadeRow.put(eightSpade));
            })

            it("must prevent even joker from filling the slot of seven", () => {
                const spadeRow = new SuitRow(SUIT.SPADE);
                assert.throws(() => spadeRow.put(joker));
            })

            it("increase the current top", () => {
                const spadeRow = new SuitRow(SUIT.SPADE);
                spadeRow.put(sevenSpade);
                spadeRow.put(eightSpade);
                assert.equal(spadeRow.top().value(), 8, "top should be 8")
            })

            it("decrease the current bottom", () =>{
                const spadeRow = new SuitRow(SUIT.SPADE);
                spadeRow.put(sevenSpade);
                spadeRow.put(sixSpade);
                // assert.doesNotThrow(() => spadeRow.put(sixSpade))
                assert.equal(spadeRow.bottom().value(), 6, "bottom should be 6");
            })
        })
    })
})
