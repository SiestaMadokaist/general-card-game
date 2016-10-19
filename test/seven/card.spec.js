"use strict";

const _ = require("lodash");
const assert = require("assert");
const SUIT = require("../../component/game/seven/suit.js")
const SuitRow = require("../../component/game/seven/suitrow.js");
const Card = require("../../component/game/seven/card.js");

describe("Seven.Card", () => {
    describe("#toCard", () => {
        it("return the correct card", () => {
            const card = Card.toCard({value: 7, suit: SUIT.SPADE});
            assert.equal(card.value(), 7);
            assert.equal(card.suit(), SUIT.SPADE);
            assert.equal(card.suitName(), "SPADE");
        })
    })

    describe(".isSuccessor", () => {
        // TODO:
        // property test can be cool here
        const sevenSpade = Card.toCard({value: 7, suit: SUIT.SPADE});
        const eightSpade = Card.toCard({value: 8, suit: SUIT.SPADE});
        const sixSpade = Card.toCard({value: 6, suit: SUIT.SPADE});
        const aceSpade = Card.toCard({value: 1, suit: SUIT.SPADE});
        const kingSpade = Card.toCard({value: 13, suit: SUIT.SPADE});
        const sevenDiamond = Card.toCard({value: 7, suit: SUIT.DIAMOND});
        const joker = Card.fromValue(53);
        it("return true if the number is exactly one level higher", () => {
            assert.equal(eightSpade.isSuccessor(sevenSpade), true);
        })

        it("return false if the number is not exactly one level higher", () => {
            assert.equal(sixSpade.isSuccessor(sevenSpade), false);
        })

        it("return true for ace if it is against king", () => {
            assert.equal(aceSpade.isSuccessor(kingSpade), true)
        })

        it("return false if the suit is different", () => {
            assert.equal(eightSpade.isSuccessor(sevenDiamond), false)
        })

        it("return true if the card is joker", () => {
            assert.equal(joker.isSuccessor(sevenDiamond), true)
        })
    })

    describe(".isPredecessor", () => {
        const sevenSpade = Card.toCard({value: 7, suit: SUIT.SPADE});
        const eightSpade = Card.toCard({value: 8, suit: SUIT.SPADE});
        const sixSpade = Card.toCard({value: 6, suit: SUIT.SPADE});
        const sevenDiamond = Card.toCard({value: 7, suit: SUIT.DIAMOND});
        const joker = Card.fromValue(53);
        it("return true if the number is exactly one level lower", () => {
            assert.equal(eightSpade.isPredecessor(sevenSpade), false);
        })

        it("return false if the number is not exactly one level lower", () => {
            assert.equal(sixSpade.isPredecessor(sevenSpade), true);
        })

        it("return false if the suit is different", () => {
            assert.equal(sixSpade.isPredecessor(sevenDiamond), false)
        })

        it("return true if the card is joker", () => {
            assert.equal(joker.isPredecessor(sevenDiamond), true)
        })
    })
})
