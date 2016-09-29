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
            const aceSpade = Card.toCard({value: 1, suit: SUIT.SPADE});
            const twoSpade = Card.toCard({value: 2, suit: SUIT.SPADE});
            const threeSpade = Card.toCard({value: 3, suit: SUIT.SPADE});
            const fourSpade = Card.toCard({value: 4, suit: SUIT.SPADE});
            const fiveSpade = Card.toCard({value: 5, suit: SUIT.SPADE});
            const sixSpade = Card.toCard({value: 6, suit: SUIT.SPADE});
            const sevenSpade = Card.toCard({value: 7, suit: SUIT.SPADE});
            const eightSpade = Card.toCard({value: 8, suit: SUIT.SPADE});
            const nineSpade = Card.toCard({value: 9, suit: SUIT.SPADE});
            const tenSpade = Card.toCard({value: 10, suit: SUIT.SPADE});
            const jackSpade = Card.toCard({value: 11, suit: SUIT.SPADE});
            const queenSpade = Card.toCard({value: 12, suit: SUIT.SPADE});
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

            it("must prevent other card from filling the slot of seven", () => {
                const spadeRow = new SuitRow(SUIT.SPADE);
                assert.throws(() => spadeRow.put(eightSpade));
            })

            it("must prevent another seven from filling the position of another seven in different row", () =>{
                const spadeRow = new SuitRow(SUIT.SPADE);
                assert.throws(() => spadeRow.put(sevenDiamond));
            })

            // TODO: shouldn`t be on the scope of put
            // put it in putAbove / putBelow
            it("must prevent even joker from filling the slot of seven", () => {
                const spadeRow = new SuitRow(SUIT.SPADE);
                assert.throws(() => spadeRow.put(joker));
                assert.throws(() => spadeRow.putAbove(joker));
                assert.throws(() => spadeRow.putBelow(joker));
            })

            it("must behave as substitute of the next card", () => {
                const spadeRow = new SuitRow(SUIT.SPADE);
                spadeRow.put(sevenSpade);
                spadeRow.putAbove(joker);
                assert.equal(spadeRow.top().value(), 8, "joker can be used to replace eight")
            })

            it("must allow the next card to be put above joker", () => {
                const spadeRow = new SuitRow(SUIT.SPADE);
                spadeRow.put(sevenSpade);
                spadeRow.putAbove(joker);
                assert.doesNotThrow(() => spadeRow.put(nineSpade));
            })

            it("must allow the joker to be used above joker", () => {
                const spadeRow = new SuitRow(SUIT.SPADE);
                spadeRow.put(sevenSpade);
                spadeRow.putAbove(joker);
                spadeRow.putAbove(joker);
            })

            it("must be playable up until ace", () => {
                const spadeRow = new SuitRow(SUIT.SPADE);
                spadeRow.put(sevenSpade);
                spadeRow.put(eightSpade);
                spadeRow.put(nineSpade);
                spadeRow.put(tenSpade);
                spadeRow.put(jackSpade);
                spadeRow.put(queenSpade);
                spadeRow.put(kingSpade);
                spadeRow.putAbove(aceSpade);
                assert.equal(spadeRow.top().value(), 14)
            })

            it("must be playable down until ace", () => {
                const spadeRow = new SuitRow(SUIT.SPADE);
                spadeRow.put(sevenSpade);
                spadeRow.put(sixSpade);
                spadeRow.put(fiveSpade);
                spadeRow.put(fourSpade);
                spadeRow.put(threeSpade);
                spadeRow.put(twoSpade);
                spadeRow.putBelow(aceSpade);
                assert.equal(spadeRow.bottom().value(), 1)
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
                assert.equal(spadeRow.bottom().value(), 6, "bottom should be 6");
            })
        })
    })
})
